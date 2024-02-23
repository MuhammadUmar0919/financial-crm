import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { Box, Grid, Typography } from '@mui/material';
import Iconify from '@/@core/components/iconify';
// import MainCard from 'Components/MainCard';

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({ navigation, title, ...others }) => {
    const location = useLocation();
    const [main, setMain] = useState();
    const [item, setItem] = useState();

    // set active item state
    const getCollapse = (menu) => {
        if (menu.children) {
            menu.children.filter((collapse) => {
                if (collapse.type && collapse.type === 'group') {
                    getCollapse(collapse);
                } else if (collapse.type && collapse.type === 'item') {
                    if (location.pathname === collapse.path) {
                        setMain(menu);
                        setItem(collapse);
                    }
                }
                return false;
            });
        }
    };

    useEffect(() => {
        navigation?.map((menu) => {
            if (menu.type && menu.type === 'group') {
                getCollapse(menu);
            } else if (menu.type && menu.type === 'item') {
                if (location.pathname === menu.path) {
                    setItem(menu);
                }
            }
        });
    });

    // only used for component demo breadcrumbs
    // if (location.pathname === '/breadcrumbs') {
    //     location.pathname = '/dashboard/analytics';
    // }

    let mainContent;
    let itemContent;
    let breadcrumbContent = <Typography />;
    let itemTitle = '';

    // collapse item
    if (main && main.type === 'collapsec') {
        mainContent = (
            <Box display="flex" alignItems="center" gap={2}>
                <Typography alignItems="center" gap={10} component={Link} to={document.location.pathname} variant="h6" sx={{ textDecoration: 'none' }} color="textSecondary">
                    <Iconify icon={main.icon} />
                    {main.title}
                </Typography>
            </Box>
        );
    }

    // items
    if (item && item.type === 'item') {
        itemTitle = item.title;
        itemContent = (
            <Box display="flex" alignItems="center" gap={2}>
                <Iconify icon={item.icon} />
                <Typography variant="subtitle1" color="textPrimary">
                    {itemTitle} 
                </Typography>
            </Box>
        );

        // main
        if (!item.breadcrumbs) {
            breadcrumbContent = (
                // <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent' }} {...others} content={false}>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
                        <Grid item>
                            <MuiBreadcrumbs aria-label="breadcrumb">
                            <Box display="flex" alignItems="center" gap={2}>
                                <Iconify icon='mdi:home-outline' />
                                <Typography component={Link} to="/" color="textSecondary" variant="h6" sx={{ textDecoration: 'none' }}>
                                    Home
                                </Typography>
                            </Box>
                                {mainContent}
                                {itemContent}
                            </MuiBreadcrumbs>
                        </Grid>
                        {title && (
                            <Grid item sx={{ mt: 2 }}>
                                <Typography variant="h5">{item.title}</Typography>
                            </Grid>
                        )}
                    </Grid>
                // </MainCard>
            );
        }
    }

    return breadcrumbContent;
};

export default Breadcrumbs;

// import PropTypes from 'prop-types';
// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import { Box, Card, Divider, Grid, Typography } from '@mui/material';
// import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

// // project imports
// // import config from 'config';
// import Iconify from 'Components/Iconify';

// const linkSX = {
//     display: 'flex',
//     color: 'grey.900',
//     textDecoration: 'none',
//     alignContent: 'center',
//     alignItems: 'center'
// };

// // // ==============================|| BREADCRUMBS ||============================== //

// const Breadcrumbs = ({ card, divider, icon, icons, maxItems, navigation, rightAlign, separator, title, titleBottom, ...others }) => {
//     const theme = useTheme();
//     const location = useLocation();
//     const iconStyle = {
//         marginRight: theme.spacing(0.75),
//         marginTop: `-${theme.spacing(0.25)}`,
//         width: '1rem',
//         height: '1rem',
//         color: theme.palette.secondary.main
//     };

//     const [main, setMain] = useState();
//     const [item, setItem] = useState();

//     // set active item state
//     const getCollapse = (menu) => {
//         if (menu.children) {
//             menu.children.filter((collapse) => {
//                 if (collapse.type && collapse.type === 'group') {
//                     getCollapse(collapse);
//                 } else if (collapse.type && collapse.type === 'item') {
//                     // if (document.location.pathname === config.basename + collapse.url) {
//                         // setMain(menu);
//                         // setItem(collapse);
//                     // }
//                     if (location.pathname === collapse.path) {
//                         setMain(menu);
//                         setItem(collapse);
//                     }
//                 }
//                 return false;
//             });
//         }
//     };

//     React.useEffect(() => {
//         navigation?.map((menu) => {
//             if (menu.type && menu.type === 'group') {
//                 getCollapse(menu);
//             } else if (location.pathname === main.path) {
//                 setItem(menu);
//             }
//         });
//     }, []);

//     // item separator
//     const SeparatorIcon = separator;
//     const separatorIcon = separator ? <SeparatorIcon stroke={1.5} size="1rem" /> : <Iconify icon="icon" stroke={1.5} size="1rem" />;

//     let mainContent;
//     let itemContent;
//     let breadcrumbContent = <Typography />;
//     let itemTitle = '';
//     let CollapseIcon;
//     let ItemIcon;

//     // collapse item
//     if (main && main.type === 'group') {
//         CollapseIcon = main.icon && main.icon;
//         mainContent = (
//             <Typography component={Link} to="#" variant="subtitle1" sx={linkSX}>
//                 {icons && <CollapseIcon style={iconStyle} />}
//                 {main.title}
//             </Typography>
//         );
//     }

//     // items
//     if (item && item.type === 'item') {
//         itemTitle = item.title;

//         ItemIcon = item.icon && item.icon;
//         itemContent = (
//             <Typography
//                 variant="subtitle1"
//                 sx={{
//                     display: 'flex',
//                     textDecoration: 'none',
//                     alignContent: 'center',
//                     alignItems: 'center',
//                     color: 'grey.500'
//                 }}
//             >
//                 {icons && <ItemIcon style={iconStyle} />}
//                 {itemTitle}
//             </Typography>
//         );

//         // main
//         if (item.breadcrumbs !== false) {
//             breadcrumbContent = (
//                 <Card
//                     sx={{
//                         marginBottom: card === false ? 0 : theme.spacing(3),
//                         border: card === false ? 'none' : '1px solid',
//                         borderColor: theme.palette.primary[200] + 75,
//                         background: card === false ? 'transparent' : theme.palette.background.default
//                     }}
//                     {...others}
//                 >
//                     <Box sx={{ p: 2, pl: card === false ? 0 : 2 }}>
//                         <Grid
//                             container
//                             direction={rightAlign ? 'row' : 'column'}
//                             justifyContent={rightAlign ? 'space-between' : 'flex-start'}
//                             alignItems={rightAlign ? 'center' : 'flex-start'}
//                             spacing={1}
//                         >
//                             {title && !titleBottom && (
//                                 <Grid item>
//                                     <Typography variant="h3" sx={{ fontWeight: 500 }}>
//                                         {item.title}
//                                     </Typography>
//                                 </Grid>
//                             )}
//                             <Grid item>
//                                 <MuiBreadcrumbs
//                                     sx={{ '& .MuiBreadcrumbs-separator': { width: 16, ml: 1.25, mr: 1.25 } }}
//                                     aria-label="breadcrumb"
//                                     maxItems={maxItems || 8}
//                                     separator={separatorIcon}
//                                 >
//                                     <Typography component={Link} to="/" color="inherit" variant="subtitle1" sx={linkSX}>
//                                         {/* {icons && <HomeTwoToneIcon sx={iconStyle} />} */}
//                                         {/* <Iconify icon={} /> */}
//                                         {/* {icon && <HomeIcon sx={{ ...iconStyle, mr: 0 }} />} */}
//                                         {!icon && 'Dashboard'}
//                                     </Typography>
//                                     {mainContent}
//                                     {itemContent}
//                                 </MuiBreadcrumbs>
//                             </Grid>
//                             {title && titleBottom && (
//                                 <Grid item>
//                                     <Typography variant="h3" sx={{ fontWeight: 500 }}>
//                                         {item.title}
//                                     </Typography>
//                                 </Grid>
//                             )}
//                         </Grid>
//                     </Box>
//                     {card === false && divider !== false && <Divider sx={{ borderColor: theme.palette.primary.main, mb: 3 }} />}
//                 </Card>
//             );
//         }
//     }

//     return breadcrumbContent;
// };

// Breadcrumbs.propTypes = {
//     card: PropTypes.bool,
//     divider: PropTypes.bool,
//     icon: PropTypes.bool,
//     icons: PropTypes.bool,
//     maxItems: PropTypes.number,
//     navigation: PropTypes.object,
//     rightAlign: PropTypes.bool,
//     separator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
//     title: PropTypes.bool,
//     titleBottom: PropTypes.bool
// };

// export default Breadcrumbs;



