import { NextPage } from 'next';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconifyIcon from 'src/components/Icon';
import { Collapse } from '@mui/material';
import List from '@mui/material/List';
import * as React from 'react';
import { Fragment, useEffect, useState } from 'react';
import { VerticalItems } from 'src/configs/layout';

type TProps = {
    open: boolean;
};

type TListItems = {
    items: any;
    level: number;
    openItems: { [key: string]: boolean };
    setOpenItems: React.Dispatch<
        React.SetStateAction<{
            [key: string]: boolean;
        }>
    >;
    disabled: boolean;
};

const RecursiveListItems: NextPage<TListItems> = ({
    items,
    level,
    openItems,
    setOpenItems,
    disabled,
}) => {
    const handleClick = (title: string) => {
        if (!disabled) {
            setOpenItems((prev) => ({
                ...prev,
                [title]: !prev[title],
            }));
        }
    };

    return (
        <>
            {items?.map((item: any) => {
                return (
                    <Fragment key={item.title}>
                        <ListItemButton
                            sx={{
                                padding: `8px 10px 8px ${level * (level === 1 ? 28 : 20)}px`,
                            }}
                            onClick={() => {
                                if (item.childrens) {
                                    handleClick(item.title);
                                }
                            }}
                        >
                            <ListItemIcon>
                                <IconifyIcon icon={item.icon} />
                            </ListItemIcon>

                            {!disabled && <ListItemText primary={item.title} />}

                            {item?.childrens && item.childrens.length > 0 && (
                                <>
                                    {openItems[item.title] ? (
                                        <IconifyIcon
                                            icon="ic:sharp-expand-more"
                                            style={{
                                                transform: 'rotate(180deg)',
                                            }}
                                        />
                                    ) : (
                                        <IconifyIcon icon="ic:sharp-expand-more" />
                                    )}
                                </>
                            )}
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
                                        openItems={openItems}
                                        setOpenItems={setOpenItems}
                                        disabled={disabled}
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

const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
    // openItems là một object với khóa là chuỗi và giá trị là boolean
    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        if (!open) {
            setOpenItems({});
        }
    }, [open]);

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <RecursiveListItems
                disabled={!open}
                items={VerticalItems}
                level={1}
                openItems={openItems}
                setOpenItems={setOpenItems}
            />
        </List>
    );
};

export default ListVerticalLayout;
