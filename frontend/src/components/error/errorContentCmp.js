import classes from './errorContentCmp.module.css';
import Text from '../../utils/TextSection';
import Icon from '../../utils/IconSection';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { SolidButton } from '../../utils/ButtonSection';

function ErrorContent({ title, children }) {
  return (
    <div className={classes.content}>
      <Icon icon={faCircleExclamation} size={10} />
      <Text h2={title} />
      <Text p16={children} />
      <div className={classes.button_container}>
        <SolidButton label={'Go Back'} />
        <SolidButton label={'Report Issue'} />
      </div>
    </div>
  );
}

export default ErrorContent;
