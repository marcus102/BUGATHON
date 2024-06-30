import React from 'react';
import classes from './CustomBugListCmp.module.css';
import Text from '../../utils/TextSection';
import HomeCard from '../card_view/HomeCardView';
import Line from '../../utils/LineSection';

function CustomBugList({ DATA, title, count }) {
  return (
    <div className={classes.bug_fixes_main_container}>
      <Text textStyle={classes.bug_fixes_header_container} h5={`${title} | ${count}`} />
      <Line direction={'horizontal'}/>
      <div className={`${classes.bug_fixes_container}`}>
        {DATA.map((data) => (
          <HomeCard
            homeCardStyle={classes.bug_fixes_cards}
            cardButtonState={data.state}
            key={data.id}
            isHeaderOption={true}
            postTitle={data.title}
            postDescription={data.description}
          />
        ))}
      </div>
    </div>
  );
}

export default CustomBugList;
