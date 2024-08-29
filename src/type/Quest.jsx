import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import styles from "./quest.css";

export default function Quest() {
    const [questNum, setQuestNum] = useState(null);
    const [selectedType, setSelectedType] = useState(null); // State for selectedType
    const location = useLocation(); // Use useLocation hook to access the URL
    const navigate = useNavigate(); // Use useNavigate hook for navigation

    // Parse query parameters
    const searchParams = new URLSearchParams(location.search);
    const initialSelectedType = parseInt(searchParams.get("select"), 10); // Get the 'select' query parameter and parse it as an integer

    const typeMissions = [
        {
            type: 1,
            name: '소보로',
            mission: ['소보로1', '소보로2', '소보로3', '소보로4']
        },
        {
            type: 2,
            name: '호빵',
            mission: ['호빵1', '호빵2', '호빵3', '호빵4']
        },
        {
            type: 3,
            name: '공갈빵',
            mission: ['공갈빵1', '공갈빵2', '공갈빵3', '공갈빵4']
        },
        {
            type: 4,
            name: '크림빵',
            mission: ['크림빵1', '크림빵2', '크림빵3', '크림빵4']
        },
    ];

    // Effect to handle initialization logic
    useEffect(() => {
        if (initialSelectedType === 0) {
            // Simulate fetching a random type from the server
            const randomType = Math.floor(Math.random() * 4) + 1;
            setSelectedType(randomType);
        } else {
            setSelectedType(initialSelectedType);
        }
    }, [initialSelectedType]);

    // Find the type object corresponding to the selectedType
    const selectedMission = typeMissions.find(mission => mission.type === selectedType);

    const handleButtonClick = () => {
        if (initialSelectedType === 0) {
            navigate('/setting'); // Navigate to /setting if initialSelectedType is 0
        } else if (selectedType >= 1) {
            navigate('/'); // Navigate to home if selectedType is 1 or greater
        }
    };

    return (
        <div className="questpage">
            {selectedMission && (
                <>
                    <div className="type-name">{selectedMission.name}</div>
                    <div>
                        <div className="questpage-title">이름 같은 분에게 추천하는 행동이에요.</div>
                        <div><img src="/images/type/quest-title.png" className="img-width" /></div>
                    </div>
                    <div className="fixed-quest-area">
                        {selectedMission.mission.map((quest, index) => (
                            <div key={index} className={`fixed-quest-box ${questNum === index + 1 ? `fixed-quest-box-${index + 1}` : ""}`}
                                onClick={() => setQuestNum(index + 1)}>
                                <div className="quest-sub-txt">점심시간, 몸과 마음을 건강하게 유지하며</div>
                                <div className="quest-txt">{quest}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <div className="questpage-btn-area">
                <div className={`questpage-btn ${questNum >= 1 ? "questpage-btn-active" : ""}`} onClick={handleButtonClick}>완료하기</div>
            </div>
        </div>
    );
}
