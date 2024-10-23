function formatDateToCustomFormat(isoDate) {
    const date = new Date(isoDate);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  

export const formatDate=(date)=>{
    const day=date.getDate();
    const month=date.toLocaleString('default',{month:'long'})
    const year=date.getFullYear();
    const formattedDate=`${day} ${month} ${year}`
    return formattedDate;
}
  
  export const formatReportDate = (date) => {
    const mongoDate = new Date(date);
    const formattedDate = `${mongoDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: '2-digit'
    }).replace(',', '')}, ${mongoDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })}`;
    return formattedDate;
  }
  
  export default formatDateToCustomFormat;
  