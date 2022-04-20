import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { Divider } from '@mui/material';

export default function ExchangesTinyList({exchanges, showNumberOfRates}) {
  const cutExchanges = exchanges.sort((a,b) => b.interestRate - a.interestRate).slice(0, showNumberOfRates);
  if (cutExchanges.length < showNumberOfRates) {
    const iterations = showNumberOfRates - cutExchanges.length;
    for (let index = 0; index < iterations; index++) {
      cutExchanges.push({logoUrl: "", name: "", interestRate: 0, lockDays: ""})
    }
  }
  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {cutExchanges.map(({logoUrl, name, interestRate, lockDays}, index) => {
        const labelId = `exchange-list-secondary-label-${index}`;
        return (
        <>
          <ListItem
            key={index}
            disablePadding
          >
            <ListItemButton>
              
                <ListItemAvatar>
                  <Avatar
                    alt={`Exchange top${index + 1}`}
                    src={logoUrl}
                    sizes=""
                    sx={{ width: 32, height: 32 }}
                  >-</Avatar>
                </ListItemAvatar>
              
              {interestRate > 0 &&(
                <ListItemText id={`exchange-${labelId}`} primary={`${(interestRate*100).toFixed(2)}% at ${name}${lockDays > 0 ? ` for ${lockDays} days` : ', flexible term'}`} />
              )}
            </ListItemButton>
          </ListItem>
          <Divider style={{color: "#000"}} />
        </>);
      })}
    </List>
  );
}
