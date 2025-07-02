// app.js

// 1. 노선 데이터 정의: 각 통근버스 노선의 기본 정보 (ID, 이름, 색상)
//    - stations 배열: 해당 노선이 어떤 정류장들을 '순서대로' 지나는지 정류장 ID로 명시합니다.
const lines = [
    { 
        id: 'line1', 
        name: '평택 (평택-평택)', // 요청하신 이름으로 변경
        color: '#007bff', 
        stations: ['station_bon_main', 'station_pyeongtaek_st', 'station_godeok_ind_comp'] 
    },
    { 
        id: 'line2', 
        name: '화성 (화성-평택)', // 요청하신 이름으로 변경
        color: '#28a745', 
        stations: ['station_bon_main', 'station_seojeongri_st', 'station_songtan_st'] 
    },
    { 
        id: 'lineA_seoul', 
        name: '기흥 (기흥-기흥)', // 요청하신 이름으로 변경
        color: '#fd7e14', 
        stations: ['station_suwon_st', 'station_jamsil_st', 'station_jonghap_st'] 
    },
    { 
        id: 'lineB_seoul', 
        name: '평택-화성-기흥 (순환)', // 요청하신 이름으로 변경
        color: '#8b008b', 
        stations: ['station_dongtan_st', 'station_gyodae_st', 'station_gangnam_st'] 
    }
    // TODO: 여기에 실제 사용하실 모든 통근버스 노선들을 추가하세요.
];

// 2. 정류장 데이터 정의: 각 정류장의 상세 정보 (ID, 이름, 지도상의 X, Y 좌표)
const stations = [
    // 본사 출발 노선들 (Line 1, Line 2)
    { id: 'station_bon_main', name: '기흥 본사', x: 200, y: 200, lines: ['line1', 'line2'] }, // 이름 변경
    { id: 'station_pyeongtaek_st', name: '평택역', x: 250, y: 150, lines: ['line1'] }, 
    { id: 'station_godeok_ind_comp', name: '평택 고덕 산업단지', x: 300, y: 100, lines: ['line1'] }, // 이름 변경
    
    { id: 'station_seojeongri_st', name: '화성 서정리역', x: 150, y: 250, lines: ['line2'] }, // 이름 변경
    { id: 'station_songtan_st', name: '화성 송탄역', x: 100, y: 300, lines: ['line2'] }, // 이름 변경

    // 서울 노선들 (Line A, Line B)
    { id: 'station_suwon_st', name: '기흥 수원역', x: 400, y: 100, lines: ['lineA_seoul'] }, // 이름 변경
    { id: 'station_jamsil_st', name: '기흥 잠실역', x: 450, y: 150, lines: ['lineA_seoul'] }, // 이름 변경
    { id: 'station_jonghap_st', name: '기흥 종합운동장역', x: 500, y: 200, lines: ['lineA_seoul'] }, // 이름 변경

    { id: 'station_dongtan_st', name: '화성 동탄역', x: 350, y: 300, lines: ['lineB_seoul'] }, // 이름 변경
    { id: 'station_gyodae_st', name: '평택 교대역', x: 400, y: 350, lines: ['lineB_seoul'] }, // 이름 변경
    { id: 'station_gangnam_st', name: '평택 강남역', x: 450, y: 400, lines: ['lineB_seoul'] } // 이름 변경
    // TODO: 여기에 실제 통근버스 정류장들과 지도상의 적절한 X, Y 좌표를 추가하세요.
];

// 3. 시간표 데이터 정의 (시간은 기존과 동일)
const schedules = [
    // 평택 (평택-평택) 시간표 (구: 통근 1호선)
    { 
        lineId: 'line1', 
        tripId: 'line1_morning1', 
        direction: '출근', 
        times: [
            { stationId: 'station_bon_main', name: '기흥 본사', time: '07:00' }, 
            { stationId: 'station_pyeongtaek_st', name: '평택역', time: '07:15' }, 
            { stationId: 'station_godeok_ind_comp', name: '평택 고덕 산업단지', time: '07:25' } 
        ]
    },
    { 
        lineId: 'line1', 
        tripId: 'line1_morning2', 
        direction: '출근',
        times: [
            { stationId: 'station_bon_main', name: '기흥 본사', time: '07:30' }, 
            { stationId: 'station_pyeongtaek_st', name: '평택역', time: '07:45' }, 
            { stationId: 'station_godeok_ind_comp', name: '평택 고덕 산업단지', time: '07:55' } 
        ]
    },
    // 화성 (화성-평택) 시간표 (구: 통근 2호선)
    { 
        lineId: 'line2', 
        tripId: 'line2_morning1', 
        direction: '출근',
        times: [
            { stationId: 'station_bon_main', name: '기흥 본사', time: '07:05' }, 
            { stationId: 'station_seojeongri_st', name: '화성 서정리역', time: '07:20' }, 
            { stationId: 'station_songtan_st', name: '화성 송탄역', time: '07:30' } 
        ]
    },
    // 기흥 (기흥-기흥) 시간표 (구: 서울 A 노선)
    { 
        lineId: 'lineA_seoul', 
        tripId: 'lineA_morning1', 
        direction: '출근',
        times: [
            { stationId: 'station_suwon_st', name: '기흥 수원역', time: '12:00' }, 
            { stationId: 'station_jamsil_st', name: '기흥 잠실역', time: '12:05' }, 
            { stationId: 'station_jonghap_st', name: '기흥 종합운동장역', time: '12:19' } 
        ]
    },
    // 평택-화성-기흥 (순환) 시간표 (구: 서울 B 노선)
    { 
        lineId: 'lineB_seoul', 
        tripId: 'lineB_evening1', 
        direction: '퇴근',
        times: [
            { stationId: 'station_gangnam_st', name: '평택 강남역', time: '17:30' }, 
            { stationId: 'station_gyodae_st', name: '평택 교대역', time: '17:45' }, 
            { stationId: 'station_dongtan_st', name: '화성 동탄역', time: '17:55' } 
        ]
    }
    // TODO: 여기에 모든 통근버스 시간표 데이터를 추가하세요.
];

// --- 4. 초기 노선도 렌더링 함수 ---
function renderBusMap() {
    const svg = document.getElementById('busMap');
    svg.innerHTML = ''; // 기존 내용 지우기

    // 각 노선 그리기
    lines.forEach(line => {
        let pathData = '';
        const lineStations = line.stations.map(stationId => stations.find(s => s.id === stationId));

        if (lineStations.length > 0) {
            pathData = `M ${lineStations[0].x} ${lineStations[0].y}`;
            for (let i = 1; i < lineStations.length; i++) {
                pathData += ` L ${lineStations[i].x} ${lineStations[i].y}`;
            }
        }

        const lineElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        lineElement.setAttribute('id', line.id);
        lineElement.setAttribute('class', 'line'); 
        lineElement.setAttribute('d', pathData); 
        lineElement.setAttribute('stroke', line.color); 
        lineElement.setAttribute('stroke-width', '5');
        lineElement.setAttribute('fill', 'none'); 
        lineElement.style.opacity = '0.7'; 
        svg.appendChild(lineElement);
    });

    // 각 정류장 그리기 (원형 아이콘과 이름)
    stations.forEach(station => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute('id', station.id);
        circle.setAttribute('class', 'station-circle'); 
        circle.setAttribute('cx', station.x);
        circle.setAttribute('cy', station.y);
        circle.setAttribute('r', '8'); 
        svg.appendChild(circle);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute('x', station.x + 12); 
        text.setAttribute('y', station.y + 4); 
        text.setAttribute('class', 'station-name-label'); 
        text.textContent = station.name;
        svg.appendChild(text);

        circle.addEventListener('click', () => {
            document.getElementById('searchBox').value = station.name; 
            filterTimetable(station.name); 
        });
    });
}

// --- 5. 시간표 렌더링 함수 ---
function renderTimetable(filteredSchedules = schedules) {
    const timetableList = document.getElementById('timetableList');
    timetableList.innerHTML = ''; 

    const linesGroupedSchedules = new Map(); 
    
    filteredSchedules.forEach(schedule => {
        if (!linesGroupedSchedules.has(schedule.lineId)) {
            linesGroupedSchedules.set(schedule.lineId, []);
        }
        linesGroupedSchedules.get(schedule.lineId).push(schedule);
    });

    linesGroupedSchedules.forEach((lineSchedules, lineId) => {
        const line = lines.find(l => l.id === lineId);
        if (!line) return; 

        const lineTimetableDiv = document.createElement('div');
        lineTimetableDiv.className = 'line-timetable';

        const lineHeader = document.createElement('h3');
        const lineColorDot = document.createElement('span'); 
        lineColorDot.className = 'line-color-dot';
        lineColorDot.style.backgroundColor = line.color;
        lineHeader.appendChild(lineColorDot);
        lineHeader.appendChild(document.createTextNode(line.name)); 
        lineTimetableDiv.appendChild(lineHeader);

        const ul = document.createElement('ul');
        lineSchedules.forEach(schedule => {
            const li = document.createElement('li');
            
            if (schedule.direction) {
                li.innerHTML += `<strong>[${schedule.direction}]</strong> `;
            }

            schedule.times.forEach((timeInfo, index) => {
                const station = stations.find(s => s.id === timeInfo.stationId);
                if (station) {
                    const stationTimeDot = document.createElement('span'); 
                    stationTimeDot.className = 'station-time-dot';
                    
                    if(index === 0) { 
                        stationTimeDot.style.backgroundColor = '#007bff'; 
                    } else if (index === schedule.times.length -1) { 
                        stationTimeDot.style.backgroundColor = '#dc3545'; 
                    } else { 
                        stationTimeDot.style.backgroundColor = '#6c757d'; 
                    }

                    li.appendChild(stationTimeDot);
                    li.appendChild(document.createTextNode(`${station.name} `));
                    const timeStrong = document.createElement('strong');
                    timeStrong.textContent = timeInfo.time;
                    li.appendChild(timeStrong);
                    
                    if(index < schedule.times.length - 1) {
                        li.appendChild(document.createTextNode(' \u00A0\u00A0\u00A0 ')); 
                    }
                }
            });
            ul.appendChild(li);
        });
        lineTimetableDiv.appendChild(ul);
        timetableList.appendChild(lineTimetableDiv);
    });

    if (filteredSchedules.length === 0 && document.getElementById('searchBox').value.trim() !== '') {
        timetableList.innerHTML = '<p style="text-align: center; color: #666;">검색 결과가 없습니다.</p>';
    } else if (filteredSchedules.length === 0) {
         timetableList.innerHTML = '<p style="text-align: center; color: #666;">로딩 중...</p>'; 
    }
}


// --- 6. 맵 스타일 초기화 함수 ---
function resetMapStyles() {
    document.querySelectorAll('.line').forEach(line => {
        line.style.strokeWidth = '5px';
        line.style.opacity = '0.7';
        line.classList.remove('highlighted-line'); 
    });
    document.querySelectorAll('.station-circle').forEach(station => {
        station.style.strokeWidth = '2px';
        station.style.fill = '#fff';
        station.style.stroke = '#333';
        station.classList.remove('highlighted-station'); 
    });
    document.querySelectorAll('.station-name-label').forEach(label => {
        label.style.fontWeight = 'normal';
        label.style.fill = '#444';
    });
}

// --- 7. 검색 및 필터링 로직 ---
function filterTimetable(searchTerm) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    let filteredSchedules = [];
    let linesToHighlight = new Set(); 
    let stationsToHighlight = new Set(); 

    if (!searchTerm) {
        filteredSchedules = schedules;
        resetMapStyles();
    } else {
        filteredSchedules = schedules.filter(schedule => {
            const line = lines.find(l => l.id === schedule.lineId);
            
            if (line && line.name.toLowerCase().includes(lowerCaseSearchTerm)) {
                linesToHighlight.add(line.id);
                line.stations.forEach(stId => stationsToHighlight.add(stId));
                return true; 
            }

            const hasMatchingStation = schedule.times.some(timeInfo => {
                const station = stations.find(s => s.id === timeInfo.stationId);
                if (station && station.name.toLowerCase().includes(lowerCaseSearchTerm)) {
                    linesToHighlight.add(line.id); 
                    stationsToHighlight.add(station.id); 
                    return true; 
                }
                return false;
            });
            return hasMatchingStation; 
        });

        resetMapStyles();
        
        linesToHighlight.forEach(lineId => {
            const lineElement = document.getElementById(lineId);
            if (lineElement) {
                lineElement.classList.add('highlighted-line');
            }
        });

        stationsToHighlight.forEach(stationId => {
            const stationEl = document.getElementById(stationId);
            if (stationEl) {
                stationEl.classList.add('highlighted-station');
            }
            const labelEl = stationEl.nextElementSibling; 
            if (labelEl && labelEl.classList.contains('station-name-label')) {
                labelEl.style.fontWeight = 'bold';
                const stationData = stations.find(s => s.id === stationId);
                if (stationData && stationData.lines.length > 0) {
                    const primaryLineColor = lines.find(l => l.id === stationData.lines[0])?.color;
                    if (primaryLineColor) {
                        labelEl.style.fill = primaryLineColor;
                    }
                }
            }
        });
    }

    renderTimetable(filteredSchedules); 
}


// --- 8. 이벤트 리스너 설정 (페이지 로드 시 및 검색 동작) ---
document.addEventListener('DOMContentLoaded', () => {
    renderBusMap(); 
    renderTimetable(); 

    const searchBox = document.getElementById('searchBox');
    const searchBtn = document.getElementById('searchBtn');

    searchBtn.addEventListener('click', () => {
        filterTimetable(searchBox.value);
    });

    searchBox.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            filterTimetable(searchBox.value);
        }
    });

    searchBox.addEventListener('input', () => {
        if (searchBox.value.trim() === '') {
            filterTimetable(''); 
        }
    });
});