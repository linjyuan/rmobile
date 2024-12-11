import './index.less';
import { PromptProps } from './interface';

const Prompt = (props: PromptProps) => {
  const map = new WeakMap();
  const { title, message } = props;
  const div = document.createElement('div');
  document.body.appendChild(div);
};

export default Prompt;
