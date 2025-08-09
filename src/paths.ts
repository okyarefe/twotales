const paths = {
  home() {
    return "/";
  },
  storyShow(storyId: string) {
    return `/stories/${storyId}`;
  },
  creditsShow() {
    return `/credits`;
  },
  showProfile() {
    return `/profile}`;
  },
};

export default paths;
