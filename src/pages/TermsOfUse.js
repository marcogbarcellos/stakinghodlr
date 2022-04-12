import React, { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

function TermsOfUse() {
  // const file_name = 'react_pinterest_clone.md';
  const file_name = "terms.md";
  const [post, setPost] = useState("");

  useEffect(() => {
    import(`./markdown/${file_name}`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setPost(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  return (
    <>
      <Container maxWidth="xl" component="main">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Markdown>{post}</Markdown>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default TermsOfUse;
