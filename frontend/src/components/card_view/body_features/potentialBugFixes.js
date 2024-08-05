import React from 'react';
import classes from './potentialBugFixes.module.css';
import Text from '../../../utils/TextSection';
import HomeCard from '../HomeCardView';
import { ButtonContainer } from '../../../utils/ButtonSection';
import Line from '../../../utils/LineSection';
import { DUMMY_BUG_FIX_DATA } from '../../../data/Database';

function PotentialBugFixes({ potentialTitle }) {
  return (
    <div className={classes.recommendation_main_container}>
      <Text textStyle={classes.recommendation_potentials_title_container} h6={potentialTitle} />
      <Line direction={'horizontal'} />
      <div className={classes.recommendation_potentials_content_container}>
        {DUMMY_BUG_FIX_DATA.map((data) => (
          <HomeCard
            homeCardStyle={classes.recommendation_potentials_content_container}
            cardButtonState={data.state}
            key={data.id}
            isHeaderOption={true}
            postTitle={data.title}
            postDescription={data.description.content}
            username={data.user.username}
            postId={data.id}
            TAGS={data.tags}
            REACTIONSMETADATA={data.reactions}
            contributionsArray={data.contributions}
            contributionsCount={data.totalAttempts}
          />
        ))}

        <ButtonContainer
          children={'More...'}
          buttonContainerMainContainer={classes.content_button_container}
        />
      </div>
    </div>
  );
}

export default PotentialBugFixes;
