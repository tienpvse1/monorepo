import { DropZone, Box, Label } from '@adminjs/design-system';
const Home = () => {
  const onUpload = (files: File[]) => {
    console.log(files);
  };

  return (
    <Box>
      <Label>Drop here</Label>
      <DropZone onChange={onUpload} />
    </Box>
  );
};

export default Home;
