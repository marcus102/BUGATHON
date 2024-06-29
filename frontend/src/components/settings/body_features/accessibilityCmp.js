import React from 'react';
import classes from './accessibilityCmp.module.css';
import Text from '../../../utils/TextSection';
import Link from '../../../utils/LinkSection';
import { Switch } from '../../../utils/InputSection';

const ACCESSIBILITY_DATA = [
  {
    id: '1',
    title: 'Shortcuts',
    description:
      'Shortcuts are a convenient way to streamline your experience on our platform. They allow you to create customized commands or actions that help you accomplish tasks more efficiently. Think of Shortcuts as personalized shortcuts to your favorite features or actions.',
    description_link: 'Learn more about shortcuts',
    children: [],
  },
  {
    id: '2',
    title: 'Motion',
    description: null,
    description_link: null,
    children: [
      {
        id: '1.1',
        label: 'Video Auto play',
        sub_description:
          'Video autoplay is a feature that automatically starts playing videos as soon as they come into view on your screen. This can enhance your browsing experience by providing instant access to video content without the need to manually click play.',
        sub_description_link: 'Learn more about video autoplay',
      },
      {
        id: '1.2',
        label: 'Auto play Animated images',
        sub_description:
          'Autoplay animated images are dynamic visual elements that play automatically without requiring any user interaction. These images are often referred to as GIFs (Graphics Interchange Format) or animated GIFs.',
        sub_description_link: 'Learn more about autoplay animated images',
      },
    ],
  },
];

const Accessibility = () => {
  return (
    <>
      {ACCESSIBILITY_DATA.map((data) => (
        <div key={data.id} className={classes.accessibility_main_container}>
          <Text h5={data.title} />
          {renderDescription(data)}
          {renderChildren(data.children)}
        </div>
      ))}
    </>
  );
};

const renderDescription = (data) => {
  if (!data.description) return null;
  return (
    <div className={classes.accessibility_container}>
      <Text label12={data.description} />
      <Link underline children12={data.description_link} />
    </div>
  );
};

const renderChildren = (children) => {
  return children.map((sub_data) => (
    <div key={sub_data.id} className={classes.accessibility_container}>
      <Switch label={sub_data.label} />
      <div className={classes.accessibility_container}>
        <Text label12={sub_data.sub_description} />
        <Link underline children12={sub_data.sub_description_link} />
      </div>
    </div>
  ));
};

export default Accessibility;
