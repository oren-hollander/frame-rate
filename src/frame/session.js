export const Session = (appId, sessionId, startTime, events, done) => 
  ({appId, sessionId, startTime, events, done})

export const NewSession = (appId, sessionId, startTime) => Session(appId, sessionId, startTime, [], false)