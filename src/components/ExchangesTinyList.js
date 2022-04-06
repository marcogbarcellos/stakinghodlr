import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { Divider } from '@mui/material';

export default function ExchangesTinyList({exchanges}) {
  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {exchanges.map(({logoUrl, name, interestRate}, index) => {
        const labelId = `exchange-list-secondary-label-${index}`;
        return (
        <>
          <ListItem
            key={index}
            // secondaryAction={
            //   <Checkbox
            //     edge="end"
            //     onChange={handleToggle(value)}
            //     checked={checked.indexOf(value) !== -1}
            //     inputProps={{ 'aria-labelledby': labelId }}
            //   />
            // }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Exchange top${index + 1}`}
                  src={logoUrl}
                />
              </ListItemAvatar>
              <ListItemText id={`exchange-${labelId}`} primary={`up to ${interestRate*100}% on ${name}`} />
            </ListItemButton>
          </ListItem>
          <Divider style={{color: "#000"}} />
        </>);
      })}
    </List>
  );
}
