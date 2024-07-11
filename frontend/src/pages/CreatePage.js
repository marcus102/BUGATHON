import React from 'react';
import CreateNew from '../components/new/createNewCmp';
import NewBugReport from '../components/new/body_features/newBugReportCmp';
import NewBugFix from '../components/new/body_features/newBugFixCmp';
import NewReusableCode from '../components/new/body_features/newReusableCodeCmp';
import { useParams } from 'react-router-dom';

function CreatePage() {
  const params = useParams();
  return (
    <CreateNew>
      {params.postId === 'bug_report' && <NewBugReport />}
      {params.postId === 'bug_fix' && <NewBugFix />}
      {params.postId === 'reusable_code' && <NewReusableCode />}
    </CreateNew>
  );
}

export default CreatePage;
