import FooterViews from '@/components/FooterBtn';
import { getCoordinate, getMaxFontSizeRatio, ratio } from '@/utils';
import { Modal, Toast } from 'antd-mobile';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import './index.less';
import { CanvasDataMap, Point, SignMaxProps } from './interface';

const useForceUpdate = () => {
  const [, update] = useReducer(() => ({}), {});
  return update;
};

const SignMax: FC<SignMaxProps> = (props) => {
  const {
    visible,
    onSubmit,
    signName,
    onClose,
    showCloseButton = false,
  } = props;

  // 签字画布
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  // 获取到画笔
  const contextRef = useRef<CanvasRenderingContext2D>(null!);

  const [isWriting, setIsWriting] = useState<boolean>(false);
  // const [endPoint, setEndPoint] = useState<Point>({ x: 0, y: 0 });
  let endPoint: Point = { x: 0, y: 0 };
  const [lineWidthMax, setLineWidthMax] = useState(0);
  // 字的下标
  const [fontIndex, setFontIndex] = useState(0);
  const [canvasData, setCanvasData] = useState<Array<CanvasDataMap>>([]);
  // const [emptyCanvasDataUrl, setEmptyCanvasDataUrl] = useState<string>('');
  const forceUpdate = useForceUpdate();
  // const [lastLineWidth, setLastLineWidth] = useState(0);

  useEffect(() => {
    if (visible) {
      const canvas = document.getElementById(
        'signaturePan',
      ) as HTMLCanvasElement;
      canvasRef.current = canvas;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      contextRef.current = ctx;
    }
  }, [visible]);

  const characterObj = useMemo(() => {
    if (!signName?.length) return {};
    return signName
      .split('')
      .reduce<Record<string, string>>((acc, character, index) => {
        return { ...acc, [index]: character };
      }, {});
  }, [signName]);

  useEffect(() => {
    const characterKeys = Object.keys(characterObj);
    if (!characterKeys.length) return;
    const initCanvasData: Array<CanvasDataMap> =
      characterKeys.reduce<CanvasDataMap>((acc, characterIndex) => {
        acc[characterIndex] = {
          character: characterObj[characterIndex],
          imageData: undefined,
          base64: undefined,
        };
        return acc;
      }, {});
    console.log({ initCanvasData });
    setCanvasData(initCanvasData);
  }, [JSON.stringify(characterObj)]);

  // console.log({ canvasData });

  const drawDotted = (sx: number, sy: number, ex: number, ey: number) => {
    const canvas = document.getElementById(
      'signatureBackground',
    ) as HTMLCanvasElement;
    if (!canvas?.getContext) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const lineInterval = 45 / ratio;
    ctx.save();

    ctx.lineWidth = 1;

    if (ctx.setLineDash) {
      // setLineDash设置虚线样式
      ctx.setLineDash([lineInterval, lineInterval]);
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
    } else {
      const len = Math.ceil(
        Math.sqrt((ex - sx) * (ex - sx) + (ey - sy) * (ey - sy)) /
          lineInterval /
          2,
      );
      const lineIntervalX = (ex - sx) / len;
      const lineIntervalY = (ey - sy) / len;
      let index = 0;
      ctx.beginPath();
      while (index < len) {
        const targetX = sx + lineIntervalX;
        const targetY = sy + lineIntervalY;
        ctx.moveTo(sx, sy);
        ctx.lineTo(targetX, targetY);
        sx = targetX + lineIntervalX;
        sy = targetY + lineIntervalY;
        index++;
      }
    }

    ctx.stroke();
    ctx.restore();
  };

  const writing = ({ x, y }: { x: number; y: number }) => {
    const ctx = contextRef.current;
    if (!ctx) return;
    ctx.beginPath();
    ctx.lineWidth = lineWidthMax;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillStyle = '#000';
    ctx.moveTo(endPoint.x, endPoint.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    endPoint = { x, y };
  };

  const initBackgroundCanvas = useCallback(() => {
    const canvas = document.getElementById(
      'signatureBackground',
    ) as HTMLCanvasElement;
    if (!canvas?.getContext) return;
    canvas.width = window.innerWidth * 0.9;
    canvas.height = canvas.width;

    drawDotted(canvas.width / 2, 0, canvas.width / 2, canvas.height); //横线
    drawDotted(0, canvas.height / 2, canvas.width, canvas.height / 2); //竖线
  }, [
    // window.innerWidth,
    // window.document.getElementById('signatureBackground'),
    visible,
  ]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas?.getContext) return;
    canvas.width = window.innerWidth * 0.9;
    canvas.height = canvas.width;
    setLineWidthMax(() => {
      const result = canvas.width / 20;
      return result;
    });
  }, [window.innerWidth, visible]);

  const drawText = (text: string) => {
    const canvas = document.getElementById(
      'signatureBackground',
    ) as HTMLCanvasElement;
    if (!canvas?.getContext) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${getMaxFontSizeRatio(text)}rem ZhengKai`;
    // ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ccc';
    ctx.fillText(text, 0, canvas.height / 2 + 30, canvas.width);
    // 画线
    drawDotted(canvas.width / 2, 0, canvas.width / 2, canvas.height); //横线
    drawDotted(0, canvas.height / 2, canvas.width, canvas.height / 2); //竖线
  };

  const initText = () => {
    drawText(characterObj[0]);
    setFontIndex(0);
  };

  useEffect(() => {
    if (visible) {
      if (!Object.keys(characterObj).length) return;
      // 初始化画布
      initCanvas();
      // 画线
      initBackgroundCanvas();
      // 画字
      initText();
    }
  }, [JSON.stringify(characterObj), visible]);

  const writeEnd = () => {
    setIsWriting(false);
  };

  const writeStart = ({ x, y }: { x: number; y: number }) => {
    setIsWriting(true);
    endPoint = { x, y };
  };

  const touchStartCallback = (e: any) => {
    e.preventDefault();
    const touch = e.touches[0];
    writeStart(getCoordinate(touch.clientX, touch.clientY));
  };

  const touchMoveCallback = (e: any) => {
    e.preventDefault();
    if (isWriting) {
      const touch = e.touches[0];
      writing(getCoordinate(touch.clientX, touch.clientY));
    }
  };

  const touchEndCallback = (e: any) => {
    e.preventDefault();
    if (isWriting === true) {
      writeEnd();
    }
  };

  const onmousedown = function (e: any) {
    e.preventDefault();
    writeStart(getCoordinate(e.clientX, e.clientY));
  };

  const onmousemove = (e: any) => {
    e.preventDefault();
    if (isWriting) {
      writing(getCoordinate(e.clientX, e.clientY));
    }
  };

  const clearCanvas = (flag?: 'reSign' | 'back') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = contextRef.current;
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initBackgroundCanvas();
    initCanvas();
    if (flag === 'reSign') {
      setCanvasData((prev) => {
        prev[fontIndex] = {
          ...prev[fontIndex],
          imageData: undefined,
          base64: undefined,
        };
        return prev;
      });
      drawText(characterObj[fontIndex]);
    }
  };

  const renderSignImgByIndex = (src: string, textContainerWidth: number) => {
    if (!src) return null;
    return (
      <img
        key={`signImg_${fontIndex}`}
        className="singImg"
        src={src}
        style={{ width: textContainerWidth, height: textContainerWidth }}
      />
    );
  };

  const previewArea =
    // useMemo(
    () => {
      const characterKeys = Object.keys(characterObj);
      const len = characterKeys.length;
      if (!len) return null;
      const textContainerWidth = (window.innerWidth / len) * 0.8;

      return characterKeys.map((characterIndex, index) => {
        const { imageData, base64 } =
          canvasData[parseInt(characterIndex, 10)] || {};
        const character = characterObj[characterIndex];
        return (
          <div
            key={`${character}_${index}`}
            className="defaultText"
            style={{
              height: textContainerWidth,
              width: textContainerWidth,
              fontSize: textContainerWidth,
            }}
            onClick={(e) => {
              e.preventDefault();
              clearCanvas();
              if (imageData?.data?.length) {
                contextRef.current?.putImageData(imageData, 0, 0);
              }
              drawText(character);
              setFontIndex(index);
            }}
          >
            {base64
              ? renderSignImgByIndex(base64, textContainerWidth)
              : character}
          </div>
        );
      });
    };
  // , [JSON.stringify(characterArr), JSON.stringify(canvasData)]);

  const isCanvasBlank = (imageData: ImageData) =>
    !imageData.data.some((channel) => channel !== 0);

  const onNextStep = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = contextRef.current;
    if (!ctx) return;

    const src = canvas.toDataURL('image/png', 1.0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (isCanvasBlank(imageData)) {
      Toast.show({
        icon: 'fail',
        content: '请先操作后再进行下一步操作！',
      });
      return;
    }

    setCanvasData((prev) => {
      prev[fontIndex] = {
        ...prev[fontIndex],
        imageData: imageData,
        base64: src,
      };

      const keys = Object.keys(characterObj);

      if (fontIndex < keys.length - 1) {
        const nextCharacter = characterObj[fontIndex + 1];
        // 当当前不为最后一个字时
        const nextCanvasData = canvasData[fontIndex + 1].imageData;
        if (nextCanvasData) {
          // 重签前面的某个字点下一步后，若后面还有，则回填下一个字的 imageData，++index
          setTimeout(() => {
            clearCanvas();
            drawText(nextCharacter);
            contextRef.current?.putImageData(nextCanvasData, 0, 0);
            setFontIndex((prev) => prev + 1);
          }, 200);
        } else {
          // 若后面没有已签的字，直接跳转下一个，不回填 imageData
          setTimeout(() => {
            clearCanvas();
            drawText(nextCharacter);
            setFontIndex((prev) => prev + 1);
          }, 200);
        }
      }
      return prev;
    });
    forceUpdate(); // 当为最后一个字时，强制更新视图，使 base64 展示在预览区域
  };

  /**
   * 检查Canvas是否已绘制内容
   * @param canvas
   * @param ctx
   * @returns
   */
  function checkIfCanvasIsDrawn(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
  ) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    // 遍历像素数据，检查是否有非透明像素
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 0) {
        // 如果alpha通道值大于0，则表示像素不是透明的
        return true; // 已绘制
      }
    }
    return false; // 未绘制
  }

  const onBack = (fontPage: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = contextRef.current;
    if (!ctx) return;

    const src = canvas.toDataURL('image/png', 1.0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log({ imageData, width: canvas.width, height: canvas.height });
    if (checkIfCanvasIsDrawn(canvas, ctx) === false) {
    } else {
      setCanvasData((prev) => {
        prev[fontIndex] = {
          ...prev[fontIndex],
          imageData: imageData,
          base64: src,
        };
        return prev;
      });
    }
    drawText(characterObj[fontIndex - 1]);
    setFontIndex((prev) => prev - 1);
    clearCanvas();
    drawText(characterObj[fontIndex - 1]);

    const backCanvasData = canvasData[fontPage];
    if (backCanvasData && backCanvasData?.base64 && backCanvasData?.imageData) {
      contextRef.current?.putImageData(backCanvasData?.imageData, 0, 0);
    }
  };

  const mergeImageDatas = (list: Array<ImageData>) => {
    const signatureCanvas = canvasRef.current;
    if (!signatureCanvas) return;

    const canvas = document.createElement('canvas');
    canvas.width = signatureCanvas.width * list.length;
    canvas.height = signatureCanvas.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    list.forEach((item, index) => {
      ctx.putImageData(item, index * signatureCanvas.width, 0);
    });

    return canvas.toDataURL('image/png', 1.0);
  };

  const onSubmit1 = () => {
    const imageDatas = Object.keys(characterObj).map(
      (characterIndex) => canvasData[parseInt(characterIndex, 10)].imageData!,
    );
    const signResult = mergeImageDatas(imageDatas);
    if (onSubmit) onSubmit(signResult, canvasData);
  };

  return (
    <div className="signMaxStyles">
      {visible && (
        <Modal
          visible={visible}
          title="请输入"
          onClose={() => {
            if (onClose) onClose();
          }}
          showCloseButton={showCloseButton}
          bodyClassName="signMaxmodal"
          content={
            <>
              <div className="signPreviewArea">{previewArea()}</div>
              <div className="signArea">
                <canvas
                  id="signatureBackground"
                  className="signatureBackground"
                ></canvas>
                <canvas
                  id="signaturePan"
                  className="signatureCanvas"
                  onMouseDown={onmousedown}
                  onMouseMove={onmousemove}
                  onMouseUp={touchEndCallback}
                  onMouseOut={touchEndCallback}
                  onTouchStart={touchStartCallback}
                  onTouchMove={touchMoveCallback}
                  onTouchEnd={touchEndCallback}
                  onTouchCancel={touchEndCallback}
                ></canvas>
              </div>
              <div className="singhint">
                请使用正楷字体，临摹签名{fontIndex}
              </div>
              <FooterViews
                list={[
                  {
                    title: '重置',
                    key: '重置',
                    type: 'negative',
                    onPress: () => clearCanvas('reSign'),
                  },
                  {
                    title: '上一步',
                    key: '上一步',
                    type: 'normal',
                    hidden: fontIndex === 0,
                    onPress: () => {
                      onBack(fontIndex - 1);
                    },
                  },
                  {
                    title: '下一步',
                    key: '下一步',
                    type: 'positive',
                    hidden: fontIndex === signName.length - 1,
                    onPress: onNextStep,
                  },
                  {
                    title: '完成',
                    key: '完成',
                    type: 'positive',
                    hidden: fontIndex !== signName.length - 1,
                    onPress: () => {
                      onNextStep();
                      // 默认可以提交
                      let isSubmit = true;
                      for (const key in canvasData) {
                        if (
                          Object.prototype.hasOwnProperty.call(canvasData, key)
                        ) {
                          if (!canvasData[Number(key)].base64) {
                            isSubmit = false;
                          }
                        }
                      }
                      if (isSubmit) {
                        setTimeout(() => {
                          onSubmit1();
                        }, 200);
                      } else {
                        Toast.show({
                          icon: 'fail',
                          content: '请先签名完整！',
                        });
                      }
                    },
                  },
                ]}
              />
            </>
          }
        ></Modal>
      )}
    </div>
  );
};

export default SignMax;
