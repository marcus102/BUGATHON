import React from 'react';
import classes from './relatedResultCmp.module.css';
import Line from '../../../utils/LineSection';
import Text from '../../../utils/TextSection';
import HomeCard from '../HomeCardView';
import { DUMMY_BUG_FIX_DATA } from '../../../data/Database';

// const DUMMY_RELATED_RESULTS_POST_DATA = [
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
//   {
//     id: '4',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_fix',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '5',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_fix',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '6',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_fix',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '7',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_fix',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '8',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_fix',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
// ];

function RelatedResults() {
  return (
    <>
      <Text
        textStyle={classes.expanded_card_related_results_header_container}
        h5={'Related Results'}
      />

      <Line direction={'horizontal'} />
      <div className={`${classes.related_results_container}`}>
        {DUMMY_BUG_FIX_DATA.map((data) => (
          <HomeCard
            homeCardStyle={classes.related_results_cards}
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
      </div>
    </>
  );
}

export default RelatedResults;
