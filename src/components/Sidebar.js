import React from 'react';
import { Drawer } from 'antd';

const Sidebar = () => {
  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <button type="button" onClick={showDrawer}>
        Open Sidebar
      </button>
      <Drawer
        title="Sidebar"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default Sidebar;