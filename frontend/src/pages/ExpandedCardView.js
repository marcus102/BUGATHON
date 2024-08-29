import React from 'react';
import ExpandedBugFix from '../components/card_view/expanded/ExpandedBugFixCmp';
import ExpandedBugReport from '../components/card_view/expanded/ExpandedBugReportCmp';
import ExpandedReusableCode from '../components/card_view/expanded/ExpandedReusableCodeCmp';
import { useSearchParams } from 'react-router-dom';

function ExpandedCardView() {
  const [searchParams] = useSearchParams();
  const current_post = searchParams.get('post');
  return (
    <>
      {current_post === 'bug_report' && <ExpandedBugReport />}
      {current_post === 'bug_fix' && <ExpandedBugFix />}
      {current_post === 'reusable_code' && <ExpandedReusableCode />}
    </>
  );
}

export default ExpandedCardView;


