# react-ant-table-filters
> Table filters for antd.


## packages
```shell
npm i @jswork/antbf-checkbox-group
npm i @jswork/antbf-radio-group
npm i @jswork/antbf-search-box
```

## usage
```jsx
import AntbfCheckboxGroup from '@jswork/antbf-checkbox-group';

export default (props: any) => {
  const filters = AntbfCheckboxGroup.get('keywords', {
    icon: 'search',
    items: [
      { value: 'k1', label: 'label1' },
      { value: 'k2', label: 'label2' },
      { value: 'k3', label: 'label3' }
    ],
    onChange: (event) => {
      console.log('evetnt change:', event.target.value);
    },
    onSubmit: (event) => {
      console.log(event.target.value);
    }
  });

  const [items, setItems] = useState([]);
  const columns = [
    { key: 'id', dataIndex: 'id' },
    { key: 'title', dataIndex: 'title', ...filters }
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
```