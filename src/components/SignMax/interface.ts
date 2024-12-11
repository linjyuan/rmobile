export interface SignMaxProps {
  visible: boolean;
  onSubmit: (file: string, base64: CanvasDataMap) => void;
  signName: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export interface CanvasDataMap {
  [key: string]: {
    character: string;
    imageData: ImageData | undefined;
    base64: string | undefined;
  };
}

export interface Point {
  x: number;
  y: number;
}
