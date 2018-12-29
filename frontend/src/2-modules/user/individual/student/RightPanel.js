import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

export default function RightPanel () {
  return (
    <div id='user-column-R'>
      <TwitterTimelineEmbed
        sourceType='profile'
        screenName='UMichResearch'
        options={{ height: 'calc(100vh - 200px)' }}
      />
    </div>
  )
}