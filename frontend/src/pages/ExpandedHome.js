import React from 'react';
import ExpandedBugFix from '../components/card_view/expanded/ExpandedBugFixCmp';
import ExpandedBugReport from '../components/card_view/expanded/ExpandedBugReportCmp';
import ExpandedReusableCode from '../components/card_view/expanded/ExpandedReusableCodeCmp';

function ExpandedHomePage() {
  return (
    <>
      <ExpandedBugReport />
      <ExpandedBugFix />
      <ExpandedReusableCode />
    </>
  );
}

export default ExpandedHomePage;
