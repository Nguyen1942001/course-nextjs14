import { NextPage } from 'next';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconifyIcon from 'src/components/Icon';
import { Collapse } from '@mui/material';
import List from '@mui/material/List';
import * as React from 'react';
import { VerticalItems } from 'src/configs/layout';
import { Fragment, useState } from 'react';
import VerticalLayout from 'src/views/layouts/VerticalLayout';

type TProps = {};

// 10p
const RecursiveListItems = ({ items, level }: { items: any; level: number }) => {
    // openItems là một object với khóa là chuỗi và giá trị là boolean
    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

    const handleClick = (title: string) => {
        setOpenItems((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    return (
        <>
            {items?.map((item: any) => {
                return (
                    <Fragment key={item.title}>
                        <ListItemButton onClick={item.childrens && handleClick(item.title)}>
                            <ListItemIcon
                                sx={{
                                    paddingLeft: `${level * 20}px`,
                                }}
                            >
                                <IconifyIcon icon={item.icon} />
                            </ListItemIcon>

                            <ListItemText primary={item.title} />
                        </ListItemButton>

                        {item.childrens && item.childrens.length > 0 && (
                            <>
                                <Collapse
                                    in={openItems[item.title]}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <RecursiveListItems
                                        items={item.childrens}
                                        level={level + 1}
                                    />
                                </Collapse>
                            </>
                        )}
                    </Fragment>
                );
            })}
        </>
    );
};

const ListVerticalLayout: NextPage<TProps> = () => {
    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <RecursiveListItems
                items={VerticalItems}
                level={1}
            />
        </List>
    );
};

export default ListVerticalLayout;
