import React, { useEffect, useState } from "react";
import useFireStore from "../hooks/useFirestore";

const PostsIndex = () => {
  const { docs } = useFireStore("post", "name");
  return (
    <div>
      <h2>heha</h2>
      {docs.map((doc) => {
        return <div>{JSON.stringify(doc)}</div>;
      })}
    </div>
  );
};

export default PostsIndex;
