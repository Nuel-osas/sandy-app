import { useEffect, useState } from 'react';
import usePointsStore from '../store/pointsStore';

const AchievementNotification = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const points = usePointsStore((state) => state.points);

  useEffect(() => {
    const achievements = [
      { threshold: 100, message: "🎉 First Milestone Reached!" },
      { threshold: 500, message: "⭐ You're Getting Better!" },
      { threshold: 1000, message: "🏆 Master Achievement Unlocked!" }
    ];

    const achievement = achievements.find(a => points === a.threshold);
    
    if (achievement) {
      setMessage(achievement.message);
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
    }
  }, [points]);

  if (!visible) return null;

  return (
    <div className="achievement-notification" 
         style={{
           position: 'fixed',
           top: '20px',
           right: '20px',
           backgroundColor: '#4CAF50',
           color: 'white',
           padding: '15px 25px',
           borderRadius: '8px',
           boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
           animation: 'slideIn 0.5s ease-out'
         }}>
      {message}
    </div>
  );
};

export default AchievementNotification;