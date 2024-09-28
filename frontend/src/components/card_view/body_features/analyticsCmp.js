import React from 'react';
import Colors from '../../../constants/colors';
import classes from './analyticsCmp.module.css';
import Text from '../../../utils/TextSection';
import Icon from '../../../utils/IconSection';
import ActivityChart from '../../activity_chart/ActivityChart';
import {
  faHeart,
  faComment,
  faArrowUpFromBracket,
  faChartSimple,
  faCaretUp,
  faPeopleGroup,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import Line from '../../../utils/LineSection';

export function Analytics({
  likesCount,
  viewsCount,
  commentsCount,
  sharesCount,
  contributionsCount,
}) {
  const ANALYTICS_DATA = [
    {
      id: '1',
      title: 'Activities',
      header_icon: faChartSimple,
      header_icon_coler: Colors.orange_ff7811,
      tottal: `${viewsCount}`,
      footer_icon: faCaretUp,
      pourcentage: '300.45%',
    },
    {
      id: '2',
      title: 'Likes',
      header_icon: faHeart,
      header_icon_coler: Colors.red_,
      tottal: `${likesCount}`,
      footer_icon: faCaretUp,
      pourcentage: '110.50%',
    },
    {
      id: '3',
      title: 'Comments',
      header_icon: faComment,
      header_icon_coler: Colors.blue_0075FF,
      tottal: `${commentsCount}`,
      footer_icon: faCaretUp,
      pourcentage: '200%',
    },
    {
      id: '4',
      title: 'Shares',
      header_icon: faArrowUpFromBracket,
      header_icon_coler: Colors.green_039000,
      tottal: `${sharesCount}`,
      footer_icon: faCaretUp,
      pourcentage: '110.45%',
    },
    {
      id: '5',
      title: 'Contributions',
      header_icon: faPeopleGroup,
      header_icon_coler: Colors.yellow_a99000,
      tottal: `${contributionsCount}`,
      footer_icon: faCaretDown,
      pourcentage: '20.34%',
    },
  ];
  return (
    <div className={classes.analytics_analytic_container}>
      <Text textStyle={classes.analytic_container} h6={'Analytics'} />
      <hr className={classes.body_horizontal_line_container} />
      <div className={classes.analytic_content_container}>
        <div className={classes.analytic_summaries_container}>
          {ANALYTICS_DATA.map((data) => (
            <div key={data.id} className={classes.summary_container}>
              <div className={classes.summary_header_container}>
                <Text label14={data.title} />
                <Icon icon={data.header_icon} color={data.header_icon_coler} />
              </div>
              <Text textStyle={classes.total_text_container} label14={data.tottal} />
              <div className={classes.summary_counter_container}>
                <Icon icon={data.footer_icon} />
                <Text label12={data.pourcentage} />
              </div>
            </div>
          ))}
        </div>
        <ActivityChart />
      </div>
    </div>
  );
}

export function Analytics2({
  likesCount,
  viewsCount,
  commentsCount,
  sharesCount,
  contributionsCount,
}) {
  const ANALYTICS_DATA = [
    {
      id: '1',
      title: 'Activities',
      header_icon: faChartSimple,
      header_icon_coler: Colors.orange_ff7811,
      tottal: `${viewsCount}`,
      footer_icon: faCaretUp,
      pourcentage: '300.45%',
    },
    {
      id: '2',
      title: 'Likes',
      header_icon: faHeart,
      header_icon_coler: Colors.red_,
      tottal: `${likesCount}`,
      footer_icon: faCaretUp,
      pourcentage: '110.50%',
    },
    {
      id: '3',
      title: 'Comments',
      header_icon: faComment,
      header_icon_coler: Colors.blue_0075FF,
      tottal: `${commentsCount}`,
      footer_icon: faCaretUp,
      pourcentage: '200%',
    },
    {
      id: '4',
      title: 'Shares',
      header_icon: faArrowUpFromBracket,
      header_icon_coler: Colors.green_039000,
      tottal: `${sharesCount}`,
      footer_icon: faCaretUp,
      pourcentage: '110.45%',
    },
    {
      id: '5',
      title: 'Contributions',
      header_icon: faPeopleGroup,
      header_icon_coler: Colors.yellow_a99000,
      tottal: `${contributionsCount}`,
      footer_icon: faCaretDown,
      pourcentage: '20.34%',
    },
  ];
  return (
    <div className={classes.analytics_container}>
      <Text h5={'Analytics'} />
      <Line direction={'horizontal'} />
      <div className={classes.analytic_content_container}>
        <div className={classes.analytic_summaries_container_2}>
          {ANALYTICS_DATA.map((data) => (
            <div key={data.id} className={classes.summary_container_2}>
              <div className={classes.summary_header_container}>
                <Text label14={data.title} />
                <Icon icon={data.header_icon} color={data.header_icon_coler} />
              </div>
              <Text textStyle={classes.total_text_container} label14={data.tottal} />
              <div className={classes.summary_counter_container}>
                <Icon icon={data.footer_icon} />
                <Text label12={data.pourcentage} />
              </div>
            </div>
          ))}
        </div>
        <ActivityChart />
      </div>
    </div>
  );
}
