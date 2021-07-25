import React, { useEffect, useState } from 'react';
import AntbfSearchBox from '../../src/main';
import '../../src/components/style.scss';
import styled from 'styled-components';
import { Table } from 'antd';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default (props: any) => {
  const antbSearchBox = AntbfSearchBox.get('rg', {
    items: [
      { value: 'k1', label: 'label1' },
      { value: 'k2', label: 'label2' },
      { value: 'k3', label: 'label3' }
    ],
    onChange: (event: any) => {
      console.log('event change:', event.target.value);
    },
    onSubmit: (event) => {
      console.log(event.target.value);
    }
  });

  const [items, setItems] = useState([]);
  const columns = [
    { key: 'id', dataIndex: 'id' },
    { key: 'title', dataIndex: 'title', ...antbSearchBox }
  ];

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((r) => r.json())
      .then((res) => {
        setItems(res.slice(0, 20));
      });
  }, []);

  return (
    <Container>
      <Table bordered rowKey="id" columns={columns} dataSource={items} />
    </Container>
  );
};
