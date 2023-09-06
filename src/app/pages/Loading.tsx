import React from 'react'
// import 'react-data-table-component/dist/data-table.css';

const Loading: React.FC = () => {
 
  return (
    <div className="lds-spinner-bac">
                  <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loading


