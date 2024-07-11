import React from 'react';
import ExpandedBugFix from '../components/card_view/expanded/ExpandedBugFixCmp';
import ExpandedBugReport from '../components/card_view/expanded/ExpandedBugReportCmp';
import ExpandedReusableCode from '../components/card_view/expanded/ExpandedReusableCodeCmp';
import { useParams } from 'react-router-dom';

function ExpandedHomePage() {
  const params = useParams();
  return (
    <>
      {params.postId === 'bug_report' && <ExpandedBugReport />}
      {params.postId === 'bug_fix' && <ExpandedBugFix />}
      {params.postId === 'reusable_code' && <ExpandedReusableCode />}
    </>
  );
}

export default ExpandedHomePage;
