import './propertyList.css';

const PropertyList = ({ type }) => {
  return (
    <div className='pList'>
      {type.map(type => (
        <div className='pListItem' key={type.id}>
          <img src={type.imgUrl} className='pListImg' />
          <div className='pListTitles'>
            <h1>{type.name}</h1>
            <h2>{`${type.count} ${type.name}`}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
