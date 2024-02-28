import { NextPage } from 'next';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconifyIcon from 'src/components/Icon';
import { Collapse } from '@mui/material';
import List from '@mui/material/List';
import * as React from 'react';
import { VerticalItems } from 'src/configs/layout';
import { Fragment } from 'react';

type TProps = {};

const ListVerticalLayout: NextPage<TProps> = () => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {VerticalItems?.map((item) => {
                return (
                    <Fragment key={item.title}>
                        <ListItemButton onClick={item.childrens && handleClick}>
                            <ListItemIcon>
                                <IconifyIcon icon={item.icon} />
                            </ListItemIcon>

                            <ListItemText primary={item.title} />
                        </ListItemButton>

                        {item.childrens && item.childrens.length > 0 && (
                            <>
                                {item.childrens.map((child) => {
                                    return (
                                        <Collapse
                                            in={open}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            <List
                                                component="div"
                                                disablePadding
                                            >
                                                <ListItemButton sx={{ pl: 4 }}>
                                                    <ListItemIcon>
                                                        <IconifyIcon icon={child.icon} />
                                                    </ListItemIcon>

                                                    <ListItemText primary={child.title} />
                                                </ListItemButton>
                                            </List>
                                        </Collapse>
                                    );
                                })}
                            </>
                        )}
                    </Fragment>
                );
            })}
        </List>
    );
};

export default ListVerticalLayout;
