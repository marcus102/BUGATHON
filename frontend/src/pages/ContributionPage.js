import React from 'react';
import CreateNew from '../components/new/createNewCmp';
import NewBugReport from '../components/new/body_features/newBugReportCmp';
import NewBugFix from '../components/new/body_features/newBugFixCmp';
import NewReusableCode from '../components/new/body_features/newReusableCodeCmp';
import { useSearchParams } from 'react-router-dom';

function ContributionPage() {
  const [searchParams] = useSearchParams();
  const post_type = searchParams.get('type');
  return (
    <CreateNew>
      {post_type === 'bug_report' && <NewBugReport />}
      {post_type === 'bug_fix' && <NewBugFix />}
      {post_type === 'reusable_code' && <NewReusableCode />}
    </CreateNew>
  );
}

export default ContributionPage;
