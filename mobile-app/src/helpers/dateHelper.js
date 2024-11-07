export const formatDateInNumbers=(isoDate) =>{
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString('en-US', options);
    return `${formattedDate}`;
  }