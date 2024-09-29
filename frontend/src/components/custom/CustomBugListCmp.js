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
  faBookmark,
} from '@fortawesome/free-solid-svg-icons';

function CustomBugList({ DATA, title, count }) {
  return (
    <div className={classes.bug_fixes_main_container}>
      <Text textStyle={classes.bug_fixes_header_container} h5={`${title} | ${count}`} />
      <Line direction={'horizontal'} />
      <div className={`${classes.bug_fixes_container}`}>
        {DATA.length > 0 ? (
          DATA.map((data, index) => (
            <HomeCard
              cardButtonState={data?.state}
              key={`${data.id}-${index}`}
              isHeaderOption={true}
              postTitle={data?.title}
              firstName={data.user?.firstName}
              lastName={data.user?.lastName}
              followersCount={data.user?.followersCount}
              followingCount={data.user?.followingCount}
              starCount={data.user?.starCount}
              postDescription={data?.description}
              username={data.user?.username}
              profession={data.user?.profession}
              role={data.user?.role}
              profileImg={data.user.image && data.user.image[0]?.imageUrl}
              timestamp={data?.createdAt}
              postId={data?.id}
              TAGS={data?.tags}
              REACTIONSMETADATA={[
                {
                  id: 'likes',
                  icon: faHeart,
                  count: `${data?.likeCount}`,
                  state: null,
                  activeColor: Colors.red_FF2B2B,
                },
                {
                  id: 'comments',
                  icon: faComment,
                  count: `${data?.comments?.length}`,
                  state: null,
                  activeColor: null,
                },
                {
                  id: 'save',
                  icon: faBookmark,
                  count: null,
                  state: data?.saveMode,
                  activeColor: Colors.yellow_,
                },
                {
                  id: 'share',
                  icon: faArrowUpFromBracket,
                  count: `${data?.shareCount}`,
                  state: null,
                  activeColor: null,
                },
                {
                  id: 'impression',
                  icon: faChartSimple,
                  count: `${data?.viewCount}`,
                  state: null,
                  activeColor: null,
                },
              ]}
              contributionsArray={data?.contributors}
              contributionsCount={data?.totalAttempts}
              likedBy={data?.likedBy}
              saveMode={data?.saveMode}
              commentsArray={data?.comments}
            />
          ))
        ) : (
          <Text h6={'No post found'} />
        )}
      </div>
    </div>
  );
}

export default CustomBugList;
