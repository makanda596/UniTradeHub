import React, { useState } from 'react'

const FollowSection= () => {
     const {activetab, setActivetab} = useState('followers')
    
    
      const openFollowers = ()=>{
        setActivetab('followers')
      }
    
      const openFollowing = ()=>{
        setActivetab('following')
      }
  return (
    <div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500 gap-10 space-x-6">
              <button className="p-2 bg-green-400" onClick={openFollowers}>{ || "no followers"}</button>
              <button className="p-2 bg-blue-400" onClick={openFollowing}>{ || "no following"}</button>
              <div>{activetab === "followers" ? (
                  <div>followers tab</div>
              ) : (
                  <div>followingtab</div>
              )}
              </div>

          </div>
    </div>
  )
}

export default FollowSection;
