import React from 'react';
import classes from './potentialBugFixes.module.css';
import Text from '../../../utils/TextSection';
import HomeCard from '../HomeCardView';
import { ButtonContainer } from '../../../utils/ButtonSection';
import Line from '../../../utils/LineSection';
import { DUMMY_BUG_FIX_DATA } from '../../../data/Database';

// const DUMMY_POST_DATA = [
//   {
//     id: '1',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_fix',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '2',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_fix',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '3',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_fix',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
// ];

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
            username={data.user}
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
