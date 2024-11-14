// import React, { useState } from "react";
// import {
//   DrawerBody,
//   DrawerHeader,
//   DrawerHeaderTitle,
//   Drawer,
//   makeStyles,
//   tokens,
//   useId,
//   useRestoreFocusSource,
//   useRestoreFocusTarget,
// } from "@fluentui/react-components";
// import TodoPage from "../pages/Todo";

// const useStyles = makeStyles({
//   root: {
//     border: "2px solid #ccc",
//     overflow: "hidden",
//     display: "flex",
//     height: "480px",
//     // backgroundColor: "#fff",
//   },
//   drawer: {
//     width: "80vw", 
//     maxWidth: "80vw",
//     overflowY: "auto",
//   },
//   drawerContent: {
//     width: "100%",
//     marginLeft:"2em" ,
//     marginTop:"1em"
//   },
// });

// const TodoDrawer = () => {
//   const styles = useStyles();
//   const [isOpen, setIsOpen] = useState(true);
//   const [type, setType] = useState("overlay");

//   const restoreFocusTargetAttributes = useRestoreFocusTarget();
//   const restoreFocusSourceAttributes = useRestoreFocusSource();

//   return (
//     <div className={styles.root}>
//       <Drawer
//         {...restoreFocusSourceAttributes}
//         type={type}
//         position="end"
//         separator
//         open={isOpen}
//         onOpenChange={(_, { open }) => setIsOpen(open)}
//         className={styles.drawer}
//       >
//         <div className={styles.drawerContent}>
//           <TodoPage />
//         </div>
//       </Drawer>
//     </div>
//   );
// };

// export default TodoDrawer;



import React, { useEffect, useState } from "react";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  makeStyles,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from "@fluentui/react-components";
import TodoPage from "../pages/Todo";

const useStyles = makeStyles({
  root: {
    
    overflow: "hidden",
    display: "flex",
    height: "480px",
  },
  drawer: {
    width: "80vw", 
    maxWidth: "80vw",
    overflowY: "auto",
    zIndex: 9999, 
    backgroundColor: "#fff",
  },
  drawerContent: {
    width: "100%",
    marginLeft: "2em",
    marginTop: "1em",
  },
});

const TodoDrawer = ({data}) => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(true);
  const [type, setType] = useState("overlay");

  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();
  useEffect(() => {
    console.log("selected", data);
 }, [data]);
  return (
    <div className={styles.root}>
      <Drawer
        {...restoreFocusSourceAttributes}
        type={type}
        position="end"
        separator
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
        className={styles.drawer}
      >
        <div className={styles.drawerContent}>
          <TodoPage data={data}/>
        </div>
      </Drawer>
    </div>
  );
};

export default TodoDrawer;
