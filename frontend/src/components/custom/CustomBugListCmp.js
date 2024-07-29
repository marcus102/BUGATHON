import React from 'react';
import classes from './CustomBugListCmp.module.css';
import Colors from '../../constants/colors';
import Text from '../../utils/TextSection';
import HomeCard from '../card_view/HomeCardView';
import Line from '../../utils/LineSection';
import {
  faArrowUpFromBracket,
  faChartSimple,
  faThumbTack,
  faComment,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

function CustomBugList({ DATA, title, count }) {
  return (
    <div className={classes.bug_fixes_main_container}>
      <Text textStyle={classes.bug_fixes_header_container} h5={`${title} | ${count}`} />
      <Line direction={'horizontal'} />
      <div className={`${classes.bug_fixes_container}`}>
        {DATA.map((data) => (
          <HomeCard
            homeCardStyle={classes.bug_fixes_cards}
            cardButtonState={data.state}
            key={data.id}
            isHeaderOption
            postTitle={data.title}
            postDescription={data.description.content}
            username={data.user}
            postId={data.id}
            TAGS={data.tags}
            REACTIONSMETADATA={[
              {
                id: 'likes',
                icon: faHeart,
                count: data.likeCount,
                activeColor: Colors.red_FF2B2B,
              },
              { id: 'comments', icon: faComment, count: data.totalComments },
              { id: 'pin', icon: faThumbTack, activeColor: Colors.yellow_ },
              { id: 'share', icon: faArrowUpFromBracket, count: data.shareCount },
              { id: 'impression', icon: faChartSimple, count: data.viewCount },
            ]}
            contributionsArray={data.contributions}
            contributionsCount={data.totalAttempts}
          />
        ))}
      </div>
    </div>
  );
}

export default CustomBugList;
