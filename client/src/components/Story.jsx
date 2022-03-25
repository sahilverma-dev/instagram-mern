import React from "react";
import { fakePostData } from "../constants/fakePostData";
import StoryCard from "./StoryCard";

const Story = () => {
  return (
    <div className="flex gap-3 max-w-screen overflow-x-scroll snap-x my-6">
      {fakePostData.map((user) => (
        <StoryCard
          key={user.id}
          username={user.user.username}
          profilePic={user.user.profilePic}
        />
      ))}
    </div>
  );
};

export default Story;
