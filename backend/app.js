const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const globalErrorHandler = require('./controllers/errorsController');
const appError = require('./utils/appError');
const bugReportRouter = require('./routes/bugReportRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/user_engagement/reviewsRoutes');
const analyticsRouter = require('./routes/pending/analyticsRoutes');
const apiIntegrationsRouter = require('./routes/pending/apiIntegrationsRoutes');
const collaborationRouter = require('./routes/pending/collaborationRoutes');
const discussionRouter = require('./routes/pending/discussionRoutes');
const docsRouter = require('./routes/pending/docsRoutes');
const eventRouter = require('./routes/pending/eventRoutes');
const feedbackRouter = require('./routes/user_engagement/feedbackRoutes');
const searchRouter = require('./routes/pending/searchRoutes');
const socialRouter = require('./routes/pending/socialRoutes');
const trainingRouter = require('./routes/pending/trainingRoutes');
const commentRouter = require('./routes/user_engagement/commentsRoutes');
const imageRouter = require('./routes/imagesRoutes');
const docRouter = require('./routes/docsRoutes');
const reusableCodeRouter = require('./routes/reusableCodeRoutes');
const bugFixRouter = require('./routes/bugFixesRoutes');
const likesRouter = require('./routes/user_engagement/likeRoutes');
const savesRouter = require('./routes/user_engagement/savesRoutes');
const viewersRouter = require('./routes/user_engagement/viewersRoutes');
const followersRouter = require('./routes/user_engagement/followersRoutes');
const contributorsRouter = require('./routes/user_engagement/contributorsRoutes');
const blogRouter = require('./routes/blogPostRoutes');
const categoriesRouter = require('./routes/filtering/categoriesRoutes');
const operatingSystemRouter = require('./routes/filtering/operatingSystemRoutes');
const programmingLanguagesRouter = require('./routes/filtering/programmingLanguagesRoutes');
const zoneOfInterestRouter = require('./routes/filtering/zoneOfInterestRoutes');
const reportHubRouter = require('./routes/restrictions/reportHubRoutes');
const appealHubRouter = require('./routes/restrictions/appealHubRoutes');
const blockedUserRouter = require('./routes/restrictions/blockedUserRoutes');
const blockedPostRouter = require('./routes/restrictions/blockedPostRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

// Serve static files from the 'assets' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(cors());

const rootUrl = '/api/v1';

app.use(`${rootUrl}/users`, userRouter);
app.use(`${rootUrl}/images`, imageRouter);
app.use(`${rootUrl}/docs`, docRouter);
app.use(`${rootUrl}/reviews`, reviewRouter);
app.use(`${rootUrl}/comments`, commentRouter);
app.use(`${rootUrl}/bug_reports`, bugReportRouter);
app.use(`${rootUrl}/bug_fixes`, bugFixRouter);
app.use(`${rootUrl}/reusable_codes`, reusableCodeRouter);
app.use(`${rootUrl}/feedbacks`, feedbackRouter);
app.use(`${rootUrl}/likes`, likesRouter);
app.use(`${rootUrl}/save`, savesRouter);
app.use(`${rootUrl}/viewers`, viewersRouter);
app.use(`${rootUrl}/followers`, followersRouter);
app.use(`${rootUrl}/contributors`, contributorsRouter);
app.use(`${rootUrl}/blogs`, blogRouter);
app.use(`${rootUrl}/categories`, categoriesRouter);
app.use(`${rootUrl}/operating_systems`, operatingSystemRouter);
app.use(`${rootUrl}/programming_languages`, programmingLanguagesRouter);
app.use(`${rootUrl}/zone_of_interests`, zoneOfInterestRouter);
app.use(`${rootUrl}/reports`, reportHubRouter);
app.use(`${rootUrl}/appeals`, appealHubRouter);
app.use(`${rootUrl}/blocked_users`, blockedUserRouter);
app.use(`${rootUrl}/blocked_posts`, blockedPostRouter);
//pending
app.use(`${rootUrl}/events`, eventRouter);
app.use(`${rootUrl}/discussions`, discussionRouter);
app.use(`${rootUrl}/integrations`, apiIntegrationsRouter);
app.use(`${rootUrl}/search/bugs`, searchRouter);
app.use(`${rootUrl}/analytics/bugs`, analyticsRouter);
app.use(`${rootUrl}/docs`, docsRouter);
app.use(`${rootUrl}/resources`, docsRouter);
app.use(`${rootUrl}/social/share`, socialRouter);
app.use(`${rootUrl}/training`, trainingRouter);
app.use(`${rootUrl}/collaboration/slack`, collaborationRouter);

app.all('*', (req, res, next) => {
  next(appError(`Sorry!!! cannot find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
