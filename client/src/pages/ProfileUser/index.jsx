import React from 'react';
import TimelineHeader from "../../components/TimelineHeader/TimelineHeader";
import { PrincipalPage } from '../../layout/principalPage';
import { Intro } from '../../components/Intro/intro';
import { CreatePost } from '../../components/CreatePost/CreatePost';
import { MainPost } from "../../components/MainPost/MainPost";
import { Posts } from "../../components/CreatePost/Posts";

export function UserProfile() {
  return (
    <PrincipalPage>
      <TimelineHeader />
      <div className="grid grid-cols-1 lg:grid-cols-12 pt-4 gap-4 z-0 pb-56">
        <div className="col-span-1 lg:col-span-4 lg:col-start-1 space-y-4">
          <Intro />
        </div>
        <div className="col-span-1 lg:col-span-8 lg:col-start-5 space-y-4">
          <CreatePost />
          <Posts />
          <MainPost />
        </div>
      </div>
    </PrincipalPage>
  );
}
