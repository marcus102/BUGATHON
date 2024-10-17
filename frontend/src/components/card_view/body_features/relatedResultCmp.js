// import React from 'react';
// import classes from './relatedResultCmp.module.css';
// import Line from '../../../utils/LineSection';
// import Text from '../../../utils/TextSection';
// import HomeCard from '../HomeCardView';
// import { DUMMY_BUG_FIX_DATA } from '../../../data/Database';

// function RelatedResults() {
//   return (
//     <>
//       <Text
//         textStyle={classes.expanded_card_related_results_header_container}
//         h5={'Related Results'}
//       />

//       <Line direction={'horizontal'} />
//       <div className={`${classes.related_results_container}`}>
//         {DUMMY_BUG_FIX_DATA.map((data) => (
//           <HomeCard
//             homeCardStyle={classes.related_results_cards}
//             cardButtonState={data.state}
//             key={data.id}
//             isHeaderOption={true}
//             postTitle={data.title}
//             postDescription={data.description.content}
//             username={data.user.username}
//             postId={data.id}
//             TAGS={data.tags}
//             // REACTIONSMETADATA={data.reactions}
//             contributionsArray={data.contributions}
//             contributionsCount={data.totalAttempts}
//           />
//         ))}
//       </div>
//     </>
//   );
// }

// export default RelatedResults;
