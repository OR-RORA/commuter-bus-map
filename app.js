// app.js

// 1. 노선 데이터 정의: 각 통근버스 노선의 기본 정보 (ID, 이름, 색상)
const lines = [
    { 
        id: 'line_pyeong_pyeong', 
        name: '평-평', 
        color: '#007bff', // 파란색
        stations: [
            'station_p2_1f_pp', 'station_p2_3f_pp', 'station_p3_1f_pp', 'station_p4_1f_pp', 
            'station_v2_1f_pp', 'station_p1_4f_pp', 'station_p2_1f_pp_return', // 순환 or 복귀용
            // 여기에 '평-평' 노선의 모든 정류장 ID를 순서대로 추가하세요.
            // 예: 'station_p2_3f_pp_late', 'station_p3_1f_pp_late', ...
        ] 
    },
    { 
        id: 'line_pyeong_ho', 
        name: '평-호', 
        color: '#8b008b', // 보라색
        stations: [
            'station_1f_ph', 'station_2f_ph', 'station_3f_ph', 'station_4f_ph', 
            'station_5f_ph', 'station_6f_ph', 'station_7f_ph', 'station_8f_ph',
            'station_9f_ph', 'station_10f_ph', 'station_11f_ph', 'station_12f_ph',
            'station_13f_ph', 'station_14f_ph', 'station_15f_ph', 'station_16f_ph',
            'station_17f_ph', 'station_18f_ph', 'station_19f_ph', 'station_20f_ph'
        ] 
    },
    { 
        id: 'line_geu_ho', 
        name: '그-호', 
        color: '#28a745', // 녹색
        stations: [
            'station_11f_gh', 'station_12f_gh', 'station_13f_gh', 'station_14f_gh',
            'station_15f_gh', 'station_16f_gh', 'station_17f_gh', 'station_18f_gh',
            'station_19f_gh', 'station_20f_gh', 'station_21f_gh', 'station_22f_gh',
            'station_29f_gh', 'station_30f_gh'
        ] 
    }
    // TODO: 필요에 따라 다른 노선을 추가할 수 있습니다.
];

// 2. 정류장 데이터 정의: 각 정류장의 상세 정보 (ID, 이름, 지도상의 X, Y 좌표)
//    x, y 좌표는 임의로 배치했습니다. 실제 지도 모양에 맞춰 조정해주세요.
//    정류장 ID는 노선별로 겹치지 않게 'station_[이름]_[노선약어]' 형식으로 부여했습니다.
const stations = [
    // 평-평 노선 정류장 (좌표는 임시로 순차적으로 배치, 실제 지도에 맞게 조정 필요)
    { id: 'station_p2_1f_pp', name: 'P2 1F', x: 100, y: 100, lines: ['line_pyeong_pyeong'] },
    { id: 'station_p2_3f_pp', name: 'P2 3F', x: 150, y: 120, lines: ['line_pyeong_pyeong'] },
    { id: 'station_p3_1f_pp', name: 'P3 1F', x: 200, y: 140, lines: ['line_pyeong_pyeong'] },
    { id: 'station_p4_1f_pp', name: 'P4 1F', x: 250, y: 160, lines: ['line_pyeong_pyeong'] },
    { id: 'station_v2_1f_pp', name: 'V2 1F', x: 300, y: 180, lines: ['line_pyeong_pyeong'] },
    { id: 'station_p1_4f_pp', name: 'P1 4F', x: 350, y: 200, lines: ['line_pyeong_pyeong'] },
    { id: 'station_p2_1f_pp_return', name: 'P2 1F (복귀)', x: 100, y: 100, lines: ['line_pyeong_pyeong'] }, // P2 1F과 동일 위치, ID만 다르게

    // 평-호 노선 정류장 (좌표는 임시로 순차적으로 배치, 실제 지도에 맞게 조정 필요)
    { id: 'station_1f_ph', name: '1F', x: 400, y: 100, lines: ['line_pyeong_ho'] },
    { id: 'station_2f_ph', name: '2F', x: 450, y: 120, lines: ['line_pyeong_ho'] },
    { id: 'station_3f_ph', name: '3F', x: 500, y: 140, lines: ['line_pyeong_ho'] },
    { id: 'station_4f_ph', name: '4F', x: 550, y: 160, lines: ['line_pyeong_ho'] },
    { id: 'station_5f_ph', name: '5F', x: 600, y: 180, lines: ['line_pyeong_ho'] },
    { id: 'station_6f_ph', name: '6F', x: 400, y: 200, lines: ['line_pyeong_ho'] },
    { id: 'station_7f_ph', name: '7F', x: 450, y: 220, lines: ['line_pyeong_ho'] },
    { id: 'station_8f_ph', name: '8F', x: 500, y: 240, lines: ['line_pyeong_ho'] },
    { id: 'station_9f_ph', name: '9F', x: 550, y: 260, lines: ['line_pyeong_ho'] },
    { id: 'station_10f_ph', name: '10F', x: 600, y: 280, lines: ['line_pyeong_ho'] },
    { id: 'station_11f_ph', name: '11F', x: 400, y: 300, lines: ['line_pyeong_ho', 'line_geu_ho'] }, // 두 노선이 겹칠 수 있는 지점
    { id: 'station_12f_ph', name: '12F', x: 450, y: 320, lines: ['line_pyeong_ho', 'line_geu_ho'] },
    { id: 'station_13f_ph', name: '13F', x: 500, y: 340, lines: ['line_pyeong_ho', 'line_geu_ho'] },
    { id: 'station_14f_ph', name: '14F', x: 550, y: 360, lines: ['line_pyeong_ho', 'line_geu_ho'] },
    { id: 'station_15f_ph', name: '15F', x: 600, y: 380, lines: ['line_pyeong_ho', 'line_geu_ho'] },
    { id: 'station_16f_ph', name: '16F', x: 400, y: 400, lines: ['line_pyeong_ho', 'line_geu_ho'] },
    { id: 'station_17f_ph', name: '17F', x: 450, y: 420, lines: ['line_pyeong_ho', 'line_geu_ho'] },
    { id: 'station_18f_ph', name: '18F', x: 500, y: 440, lines: ['line_pyeong_ho'] },
    { id: 'station_19f_ph', name: '19F', x: 550, y: 460, lines: ['line_pyeong_ho'] },
    { id: 'station_20f_ph', name: '20F', x: 600, y: 480, lines: ['line_pyeong_ho'] },


    // 그-호 노선 정류장 (평-호와 일부 겹치는 층 존재, 좌표는 임시로 순차적으로 배치)
    { id: 'station_11f_gh', name: '11F', x: 100, y: 400, lines: ['line_geu_ho', 'line_pyeong_ho'] },
    { id: 'station_12f_gh', name: '12F', x: 150, y: 420, lines: ['line_geu_ho', 'line_pyeong_ho'] },
    { id: 'station_13f_gh', name: '13F', x: 200, y: 440, lines: ['line_geu_ho', 'line_pyeong_ho'] },
    { id: 'station_14f_gh', name: '14F', x: 250, y: 460, lines: ['line_geu_ho', 'line_pyeong_ho'] },
    { id: 'station_15f_gh', name: '15F', x: 300, y: 480, lines: ['line_geu_ho', 'line_pyeong_ho'] },
    { id: 'station_16f_gh', name: '16F', x: 100, y: 500, lines: ['line_geu_ho', 'line_pyeong_ho'] },
    { id: 'station_17f_gh', name: '17F', x: 150, y: 520, lines: ['line_geu_ho', 'line_pyeong_ho'] },
    { id: 'station_18f_gh', name: '18F', x: 200, y: 540, lines: ['line_geu_ho'] },
    { id: 'station_19f_gh', name: '19F', x: 250, y: 560, lines: ['line_geu_ho'] },
    { id: 'station_20f_gh', name: '20F', x: 300, y: 580, lines: ['line_geu_ho'] },
    { id: 'station_21f_gh', name: '21F', x: 100, y: 600, lines: ['line_geu_ho'] },
    { id: 'station_22f_gh', name: '22F', x: 150, y: 620, lines: ['line_geu_ho'] },
    { id: 'station_29f_gh', name: '29F', x: 200, y: 640, lines: ['line_geu_ho'] },
    { id: 'station_30f_gh', name: '30F', x: 250, y: 660, lines: ['line_geu_ho'] }
    // TODO: image_28b796.png에 있는 모든 층별 정류장들을 여기에 추가하고 적절한 x, y 좌표를 설정해주세요.
];

// 3. 시간표 데이터 정의 (image_28b796.png 기반, 모든 시간은 아니므로 사용자 추가 필요)
const schedules = [
    // 평-평 노선 시간표
    { 
        lineId: 'line_pyeong_pyeong', 
        tripId: 'pp_trip_1000', 
        direction: '정방향', // 임의로 방향 추가
        times: [
            { stationId: 'station_p2_1f_pp', name: 'P2 1F', time: '10:00' }, 
            { stationId: 'station_p2_3f_pp', name: 'P2 3F', time: '10:10' }, 
            { stationId: 'station_p3_1f_pp', name: 'P3 1F', time: '10:20' },
            { stationId: 'station_p4_1f_pp', name: 'P4 1F', time: '10:30' },
            { stationId: 'station_v2_1f_pp', name: 'V2 1F', time: '10:40' }
        ]
    },
    { 
        lineId: 'line_pyeong_pyeong', 
        tripId: 'pp_trip_1050', 
        direction: '정방향', 
        times: [
            { stationId: 'station_p1_4f_pp', name: 'P1 4F', time: '10:50' }, 
            { stationId: 'station_p2_1f_pp_return', name: 'P2 1F', time: '12:30' }, // 다음 시간대 시작 정류장
            { stationId: 'station_p2_3f_pp', name: 'P2 3F', time: '13:10' }
        ]
    },
    { 
        lineId: 'line_pyeong_pyeong', 
        tripId: 'pp_trip_1650', 
        direction: '역방향', // 예시로 역방향 설정
        times: [
            { stationId: 'station_v2_1f_pp', name: 'V2 1F', time: '16:50' },
            { stationId: 'station_p1_4f_pp', name: 'P1 4F', time: '17:55' },
            { stationId: 'station_p2_1f_pp_return', name: 'P2 1F', time: '21:00' }
        ]
    },
    // TODO: image_28b796.png의 '평-평' 노선 모든 시간을 여기에 추가하세요.
    // 각 시간대별로 새로운 { tripId, direction, times: [...] } 객체를 추가합니다.

    // 평-호 노선 시간표
    { 
        lineId: 'line_pyeong_ho', 
        tripId: 'ph_trip_1000', 
        direction: '정방향', 
        times: [
            { stationId: 'station_1f_ph', name: '1F', time: '10:00' }, 
            { stationId: 'station_3f_ph', name: '3F', time: '10:20' }, 
            { stationId: 'station_4f_ph', name: '4F', time: '10:30' },
            { stationId: 'station_6f_ph', name: '6F', time: '10:50' }
        ]
    },
    { 
        lineId: 'line_pyeong_ho', 
        tripId: 'ph_trip_1650', 
        direction: '정방향', 
        times: [
            { stationId: 'station_11f_ph', name: '11F', time: '16:50' }, 
            { stationId: 'station_13f_ph', name: '13F', time: '21:00' }, 
            { stationId: 'station_14f_ph', name: '14F', time: '21:20' }
        ]
    },
    // TODO: image_28b796.png의 '평-호' 노선 모든 시간을 여기에 추가하세요.

    // 그-호 노선 시간표
    { 
        lineId: 'line_geu_ho', 
        tripId: 'gh_trip_0950', 
        direction: '정방향', 
        times: [
            { stationId: 'station_11f_gh', name: '11F', time: '9:50' }, 
            { stationId: 'station_12f_gh', name: '12F', time: '10:30' }, 
            { stationId: 'station_13f_gh', name: '13F', time: '11:15' },
            { stationId: 'station_14f_gh', name: '14F', time: '11:35' }
        ]
    },
    { 
        lineId: 'line_geu_ho', 
        tripId: 'gh_trip_1900', 
        direction: '정방향', 
        times: [
            { stationId: 'station_21f_gh', name: '21F', time: '19:00' }, 
            { stationId: 'station_22f_gh', name: '22F', time: '20:00' }, 
            { stationId: 'station_11f_gh', name: '11F', time: '21:00' }
        ]
    }
    // TODO: image_28b796.png의 '그-호' 노선 모든 시간을 여기에 추가하세요.
];

// --- 4. 초기 노선도 렌더링 함수 ---
function renderBusMap() {
    const svg = document.getElementById('busMap');
    svg.innerHTML = ''; // 기존 내용 지우기

    // 각 노선 그리기
    lines.forEach(line => {
        let pathData = '';
        // 해당 노선의 정류장만 필터링하여 순서대로 가져옴
        const lineStations = line.stations
            .map(stationId => stations.find(s => s.id === stationId))
            .filter(Boolean); // undefined가 있다면 제거

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
    
    // 노선별로 시간표 그룹화
    filteredSchedules.forEach(schedule => {
        if (!linesGroupedSchedules.has(schedule.lineId)) {
            linesGroupedSchedules.set(schedule.lineId, []);
        }
        linesGroupedSchedules.get(schedule.lineId).push(schedule);
    });

    // 그룹화된 노선별 시간표 렌더링
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
                    
                    // 첫 정류장 파란색, 마지막 정류장 빨간색, 중간 회색
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
                        li.appendChild(document.createTextNode(' \u00A0\u00A0\u00A0 ')); // 구분자 추가
                    }
                }
            });
            ul.appendChild(li);
        });
        lineTimetableDiv.appendChild(ul);
        timetableList.appendChild(lineTimetableDiv);
    });

    // 검색 결과 없거나 초기 로딩 메시지
    if (filteredSchedules.length === 0 && document.getElementById('searchBox').value.trim() !== '') {
        timetableList.innerHTML = '<p style="text-align: center; color: #666;">검색 결과가 없습니다.</p>';
    } else if (filteredSchedules.length === 0) {
         // 초기 로딩 시에도 시간표 데이터가 비어있다면 로딩 중 메시지 표시
         // (정확한 시간표 데이터가 아직 다 채워지지 않았으므로)
         timetableList.innerHTML = '<p style="text-align: center; color: #666;">시간표 데이터를 불러올 수 없습니다. 데이터를 확인해주세요.</p>'; 
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
        // 검색어가 없으면 모든 스케줄 표시하고 스타일 초기화
        filteredSchedules = schedules;
        resetMapStyles();
    } else {
        // 검색어에 따라 스케줄 필터링 및 하이라이트할 노선/정류장 식별
        filteredSchedules = schedules.filter(schedule => {
            const line = lines.find(l => l.id === schedule.lineId);
            
            // 노선 이름에 검색어 포함 여부 확인
            if (line && line.name.toLowerCase().includes(lowerCaseSearchTerm)) {
                linesToHighlight.add(line.id);
                // 해당 노선의 모든 정류장 하이라이트
                line.stations.forEach(stId => stationsToHighlight.add(stId));
                return true; // 이 스케줄은 포함
            }

            // 스케줄의 각 정류장 이름에 검색어 포함 여부 확인
            const hasMatchingStation = schedule.times.some(timeInfo => {
                const station = stations.find(s => s.id === timeInfo.stationId);
                if (station && station.name.toLowerCase().includes(lowerCaseSearchTerm)) {
                    linesToHighlight.add(line.id); // 관련 노선 하이라이트
                    stationsToHighlight.add(station.id); // 해당 정류장 하이라이트
                    return true; // 이 스케줄은 포함
                }
                return false;
            });
            return hasMatchingStation; 
        });

        resetMapStyles(); // 검색 결과 렌더링 전 맵 스타일 초기화
        
        // 검색된 노선 하이라이트
        linesToHighlight.forEach(lineId => {
            const lineElement = document.getElementById(lineId);
            if (lineElement) {
                lineElement.classList.add('highlighted-line');
            }
        });

        // 검색된 정류장 하이라이트 및 라벨 스타일 변경
        stationsToHighlight.forEach(stationId => {
            const stationEl = document.getElementById(stationId);
            if (stationEl) {
                stationEl.classList.add('highlighted-station');
            }
            const labelEl = stationEl.nextElementSibling; // 정류장 원 다음이 라벨 텍스트임
            if (labelEl && labelEl.classList.contains('station-name-label')) {
                labelEl.style.fontWeight = 'bold';
                // 해당 정류장이 속한 주 노선의 색상으로 라벨 색상 변경 (선택 사항)
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

    renderTimetable(filteredSchedules); // 필터링된 스케줄로 시간표 렌더링
}


// --- 8. 이벤트 리스너 설정 (페이지 로드 시 및 검색 동작) ---
document.addEventListener('DOMContentLoaded', () => {
    renderBusMap(); // 페이지 로드 시 노선도 그리기
    renderTimetable(); // 페이지 로드 시 전체 시간표 렌더링

    const searchBox = document.getElementById('searchBox');
    const searchBtn = document.getElementById('searchBtn');

    // 검색 버튼 클릭 시
    searchBtn.addEventListener('click', () => {
        filterTimetable(searchBox.value);
    });

    // 검색창에서 Enter 키 누를 시
    searchBox.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            filterTimetable(searchBox.value);
        }
    });

    // 검색창 내용이 변경될 때 (실시간 검색 효과)
    searchBox.addEventListener('input', () => {
        if (searchBox.value.trim() === '') {
            filterTimetable(''); // 검색창이 비어있으면 전체 시간표 다시 표시
        }
    });
});