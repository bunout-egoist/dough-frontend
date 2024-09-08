import React from "react";

export default function EditQuest() {
    fetch(`/api/v1/dashboard/monthly/${yearMonth}`, {
        method: 'GET',
        // mode: 'no-cors',
        credentials: 'include',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYW51bmE1MzBAZ21haWwuY29tIiwiaWF0IjoxNzI1NDczMjY1LCJleHAiOjE5ODQ2NzMyNjUsInN1YiI6ImdvZXVuQGdtYWlsLmNvbSIsImlkIjoxfQ.YGjMrp0ECN0CGlTATVtGffnr6lf8fiodQ698_AmY9HE', 
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          this.setState({ 
            contents: data,
            
           });
          console.log(data);
          this.state.averageCompletion = data.averageCompletion;
          this.state.completedAllQuestsDateCount = data.completedAllQuestsDateCount;
          this.state.countDetails = data.countDetails
  
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    return(
        <div className="setting-edit-quest-area">
            
        </div>
    );
}