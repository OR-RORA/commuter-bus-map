// app.js

// 1. 노선 데이터 정의: 각 통근버스 노선의 기본 정보 (ID, 이름, 색상)
//    - stations 배열: 해당 노선이 어떤 정류장들을 '순서대로' 지나는지 정류장 ID로 명시합니다.
//      (이 순서는 노선도를 그릴 때와 시간표를 표시할 때 모두 중요합니다.)
const lines = [
    { 
        id: 'line1', 
        name: '통근 1호선 (고덕 산업단지 방향)', 
        color: '#007bff', // 파란색
        stations: ['station_bon_main', 'station_pyeongtaek_st', 'station_godeok_ind_comp'] 
    },
    { 
        id: 'line2', 
        name: '통근 2호선 (송탄 방향)', 
        color: '#28a745', // 초록색
        stations: ['station_bon_main', 'station_seojeongri_st', 'station_songtan_st'] 
    },
    { 
        id: 'lineA_seoul', 
        name: '서울 A 노선 (종합운동장 방향)', 
        color: '#fd7e14', // 주황색
        stations: ['station_suwon_st', 'station_jamsil_st', 'station_jonghap_st'] 
    },
    { 
        id: 'lineB_seoul', 
        name: '서울 B 노선 (교대 방향)', 
        color: '#8b008b', // 보라색
        stations: ['station_dongtan_st', 'station_gyodae_st', 'station_gangnam_st'] 
    }
    // TODO: 여기에 실제 사용하실 모든 통근버스 노선들을 추가하세요.
    // { id: 'newLineId', name: '새로운 노선 이름', color: '#hexcolor', stations: ['stationId1', 'stationId2', ...] }
];

// 2. 정류장 데이터 정의: 각 정류장의 상세 정보 (ID, 이름, 지도상의 X, Y 좌표)
//    - lines 배열: 이 정류장을 어떤 노선들이 지나는지 명시합니다. (환승역처럼 여러 노선이 지날 수 있음)
const stations = [
    // 본사 출발 노선들 (Line 1, Line 2)
    { id: 'station_bon_main', name: '본사', x: 200, y: 200, lines: ['line1', 'line2'] },
    { id: 'station_pyeongtaek_st', name: '평택역', x: 250, y: 150, lines: ['line1'] },
    { id: 'station_godeok_ind_comp', name: '고덕 산업단지', x: 300, y: 100, lines: ['line1'] },
    
    { id: 'station_seojeongri_st', name: '서정리역', x: 150, y: 250, lines: ['line2'] },
    { id: 'station_songtan_st', name: '송탄역', x: 100, y: 300, lines: ['line2'] },

    // 서울 노선들 (Line A, Line B)
    { id: 'station_suwon_st', name: '수원역', x: 400, y: 100, lines: ['lineA_seoul'] },
    { id: 'station_jamsil_st', name: '잠실역', x: 450, y: 150, lines: ['lineA_seoul'] },
    { id: 'station_jonghap_st', name: '종합운동장역', x: 500, y: 200, lines: ['lineA_seoul'] },

    { id: 'station_dongtan_st', name: '동탄역', x: 350, y: 300, lines: ['lineB_seoul'] },
    { id: 'station_gyodae_st', name: '교대역', x: 400, y: 350, lines: ['lineB_seoul'] },
    { id: 'station_gangnam_st', name: '강남역', x: 450, y: 400, lines: ['lineB_seoul'] }
    // TODO: 여기에 실제 통근버스 정류장들과 지도상의 적절한 X, Y 좌표를 추가하세요.
    // X, Y 좌표는 0부터 mapContainer의 가로/세로 크기 내에서 시각적으로 노선이 잘 보이도록 배치하는 것이 중요합니다.
    // 예를 들어, mapContainer의 높이가 700px라면 y 좌표는 0~700 사이여야 합니다.
];

// 3. 시간표 데이터 정의 (핵심): 각 노선별, 회차별 정류장 도착/출발 시간
//    - lineId: 어떤 노선에 대한 시간표인지
//    - tripId (선택 사항): 특정 회차(예: 아침 7시 버스)를 구분하기 위함
//    - direction (선택 사항): '출근', '퇴근' 등 방향 구분 (필요시 추가)
//    - times: { stationId: '정류장 ID', name: '정류장 이름', time: 'HH:MM' } 형태의 배열
//      (times 배열 내의 순서는 해당 노선의 station 배열 순서와 일치하는 것이 좋습니다.)
const schedules = [
    // 통근 1호선 시간표
    { 
        lineId: 'line1', 
        tripId: 'line1_morning1', 
        direction: '출근', // 예시: 방향 구분
        times: [
            { stationId: 'station_bon_main', name: '본사', time: '07:00' },
            { stationId: 'station_pyeongtaek_st', name: '평택역', time: '07:15' },
            { stationId: 'station_godeok_ind_comp', name: '고덕 산업단지', time: '07:25' }
        ]
    },
    { 
        lineId: 'line1', 
        tripId: 'line1_morning2', 
        direction: '출근',
        times: [
            { stationId: 'station_bon_main', name: '본사', time: '07:30' },
            { stationId: 'station_pyeongtaek_st', name: '평택역', time: '07:45' },
            { stationId: 'station_godeok_ind_comp', name: '고덕 산업단지', time: '07:55' }
        ]
    },
    // 통근 2호선 시간표
    { 
        lineId: 'line2', 
        tripId: 'line2_morning1', 
        direction: '출근',
        times: [
            { stationId: 'station_bon_main', name: '본사', time: '07:05' },
            { stationId: 'station_seojeongri_st', name: '서정리역', time: '07:20' },
            { stationId: 'station_songtan_st', name: '송탄역', time: '07:30' }
        ]
    },
    // 서울 A 노선 시간표
    { 
        lineId: 'lineA_seoul', 
        tripId: 'lineA_morning1', 
        direction: '출근',
        times: [
            { stationId: 'station_suwon_st', name: '수원역', time: '12:00' },
            { stationId: 'station_jamsil_st', name: '잠실역', time: '12:05' },
            { stationId: 'station_jonghap_st', name: '종합운동장역', time: '12:19' }
        ]
    },
    // 서울 B 노선 시간표 (오후 운행 예시)
    { 
        lineId: 'lineB_seoul', 
        tripId: 'lineB_evening1', 
        direction: '퇴근',
        times: [
            { stationId: 'station_gangnam_st', name: '강남역', time: '17:30' },
            { stationId: 'station_gyodae_st', name: '교대역', time: '17:45' },
            { stationId: 'station_dongtan_st', name: '동탄역', time: '17:55' }
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
        // 노선에 정의된 정류장 순서에 따라 SVG path를 생성
        const lineStations = line.stations.map(stationId => stations.find(s => s.id === stationId));

        if (lineStations.length > 0) {
            pathData = `M ${lineStations[0].x} ${lineStations[0].y}`;
            for (let i = 1; i < lineStations.length; i++) {
                pathData += ` L ${lineStations[i].x} ${lineStations[i].y}`;
            }
        }

        const lineElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        lineElement.setAttribute('id', line.id);
        lineElement.setAttribute('class', 'line'); // CSS 스타일을 위해 클래스 추가
        lineElement.setAttribute('d', pathData); // 경로 데이터
        lineElement.setAttribute('stroke', line.color); // 노선 색상
        lineElement.setAttribute('stroke-width', '5');
        lineElement.setAttribute('fill', 'none'); // 선이므로 채우기 없음
        lineElement.style.opacity = '0.7'; // 기본 투명도
        svg.appendChild(lineElement);
    });

    // 각 정류장 그리기 (원형 아이콘과 이름)
    stations.forEach(station => {
        // 정류장 원형 아이콘
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute('id', station.id);
        circle.setAttribute('class', 'station-circle'); // CSS 스타일을 위해 클래스 추가
        circle.setAttribute('cx', station.x);
        circle.setAttribute('cy', station.y);
        circle.setAttribute('r', '8'); // 반지름
        svg.appendChild(circle);

        // 정류장 이름 텍스트
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute('x', station.x + 12); // 원 옆에 위치
        text.setAttribute('y', station.y + 4); // 중앙에 가깝게
        text.setAttribute('class', 'station-name-label'); // CSS 스타일을 위해 클래스 추가
        text.textContent = station.name;
        svg.appendChild(text);

        // 정류장 클릭 시 검색 기능 연동 (선택 사항)
        circle.addEventListener('click', () => {
            document.getElementById('searchBox').value = station.name; // 검색창에 정류장 이름 입력
            filterTimetable(station.name); // 해당 정류장으로 시간표 필터링 및 노선도 강조
        });
    });
}

// --- 5. 시간표 렌더링 함수 ---
// 주어진 시간표 데이터(filteredSchedules)를 기반으로 좌측 패널을 업데이트합니다.
function renderTimetable(filteredSchedules = schedules) {
    const timetableList = document.getElementById('timetableList');
    timetableList.innerHTML = ''; // 이전 목록 모두 지우기

    // 각 노선별로 시간표를 그룹화하기 위한 Map (Map<lineId, Array<schedule>>)
    const linesGroupedSchedules = new Map(); 
    
    // filteredSchedules 배열의 각 요소를 lineId 기준으로 그룹화
    filteredSchedules.forEach(schedule => {
        if (!linesGroupedSchedules.has(schedule.lineId)) {
            linesGroupedSchedules.set(schedule.lineId, []);
        }
        linesGroupedSchedules.get(schedule.lineId).push(schedule);
    });

    // 그룹화된 노선 시간표를 바탕으로 HTML 요소 생성
    linesGroupedSchedules.forEach((lineSchedules, lineId) => {
        const line = lines.find(l => l.id === lineId);
        if (!line) return; // 해당 노선 정보가 없으면 스킵

        const lineTimetableDiv = document.createElement('div');
        lineTimetableDiv.className = 'line-timetable';

        // 노선 이름 헤더 (예: 통근 1호선 (고덕 산업단지 방향))
        const lineHeader = document.createElement('h3');
        const lineColorDot = document.createElement('span'); // 노선 색상 동그라미
        lineColorDot.className = 'line-color-dot';
        lineColorDot.style.backgroundColor = line.color;
        lineHeader.appendChild(lineColorDot);
        lineHeader.appendChild(document.createTextNode(line.name)); // 텍스트 노드 추가
        lineTimetableDiv.appendChild(lineHeader);

        // 각 회차별 시간표 리스트
        const ul = document.createElement('ul');
        lineSchedules.forEach(schedule => {
            const li = document.createElement('li');
            
            // 회차별 방향 (예: [출근])
            if (schedule.direction) {
                li.innerHTML += `<strong>[${schedule.direction}]</strong> `;
            }

            // 각 정류장별 시간 정보
            schedule.times.forEach((timeInfo, index) => {
                const station = stations.find(s => s.id === timeInfo.stationId);
                if (station) {
                    const stationTimeDot = document.createElement('span'); // 정류장별 시간 앞의 작은 동그라미
                    stationTimeDot.className = 'station-time-dot';
                    
                    // 이미지처럼 시작점, 중간점, 종점의 점 색깔을 다르게 할 수 있습니다.
                    if(index === 0) { // 시작 정류장
                        stationTimeDot.style.backgroundColor = '#007bff'; // 파란색
                    } else if (index === schedule.times.length -1) { // 마지막 정류장
                        stationTimeDot.style.backgroundColor = '#dc3545'; // 빨간색
                    } else { // 중간 정류장
                        stationTimeDot.style.backgroundColor = '#6c757d'; // 회색
                    }

                    li.appendChild(stationTimeDot);
                    li.appendChild(document.createTextNode(`${station.name} `));
                    const timeStrong = document.createElement('strong');
                    timeStrong.textContent = timeInfo.time;
                    li.appendChild(timeStrong);
                    
                    // 마지막 정류장이 아니면 구분자 추가
                    if(index < schedule.times.length - 1) {
                        li.appendChild(document.createTextNode(' \u00A0\u00A0\u00A0 ')); // &nbsp;&nbsp;&nbsp;
                    }
                }
            });
            ul.appendChild(li);
        });
        lineTimetableDiv.appendChild(ul);
        timetableList.appendChild(lineTimetableDiv);
    });

    // 필터링 결과가 없을 경우 메시지 표시
    if (filteredSchedules.length === 0 && document.getElementById('searchBox').value.trim() !== '') {
        timetableList.innerHTML = '<p style="text-align: center; color: #666;">검색 결과가 없습니다.</p>';
    } else if (filteredSchedules.length === 0) {
         timetableList.innerHTML = '<p style="text-align: center; color: #666;">로딩 중...</p>'; // 초기 로딩 메시지 유지
    }
}


// --- 6. 맵 스타일 초기화 함수 ---
function resetMapStyles() {
    // 모든 노선을 기본 스타일로 되돌립니다.
    document.querySelectorAll('.line').forEach(line => {
        line.style.strokeWidth = '5px';
        line.style.opacity = '0.7';
        line.classList.remove('highlighted-line'); // 강조 클래스 제거
    });
    // 모든 정류장을 기본 스타일로 되돌립니다.
    document.querySelectorAll('.station-circle').forEach(station => {
        station.style.strokeWidth = '2px';
        station.style.fill = '#fff';
        station.style.stroke = '#333';
        station.classList.remove('highlighted-station'); // 강조 클래스 제거
    });
    // 모든 정류장 이름 레이블을 기본 스타일로 되돌립니다.
    document.querySelectorAll('.station-name-label').forEach(label => {
        label.style.fontWeight = 'normal';
        label.style.fill = '#444';
    });
}

// --- 7. 검색 및 필터링 로직 ---
// 검색어에 따라 시간표를 필터링하고 노선도를 강조합니다.
function filterTimetable(searchTerm) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    let filteredSchedules = [];
    let linesToHighlight = new Set(); // 검색 결과에 따라 강조할 노선 ID들을 저장할 Set
    let stationsToHighlight = new Set(); // 검색 결과에 따라 강조할 정류장 ID들을 저장할 Set

    if (!searchTerm) {
        // 검색어가 없으면 전체 시간표를 표시하고 스타일 초기화
        filteredSchedules = schedules;
        resetMapStyles();
    } else {
        // 검색어에 해당하는 노선 또는 정류장을 찾습니다.
        filteredSchedules = schedules.filter(schedule => {
            const line = lines.find(l => l.id === schedule.lineId);
            
            // 1. 노선 이름에 검색어가 포함되는 경우
            if (line && line.name.toLowerCase().includes(lowerCaseSearchTerm)) {
                linesToHighlight.add(line.id);
                // 이 노선에 포함된 모든 정류장을 강조 대상에 추가 (선택 사항, 이미지와 유사하게)
                line.stations.forEach(stId => stationsToHighlight.add(stId));
                return true; // 이 스케줄은 필터링 결과에 포함
            }

            // 2. 정류장 이름에 검색어가 포함되는 경우 (해당 정류장을 지나는 스케줄만)
            const hasMatchingStation = schedule.times.some(timeInfo => {
                const station = stations.find(s => s.id === timeInfo.stationId);
                if (station && station.name.toLowerCase().includes(lowerCaseSearchTerm)) {
                    linesToHighlight.add(line.id); // 해당 정류장이 속한 노선 강조
                    stationsToHighlight.add(station.id); // 해당 정류장 강조
                    return true; // 이 스케줄은 필터링 결과에 포함
                }
                return false;
            });
            return hasMatchingStation; // 노선 이름 또는 정류장 이름 중 하나라도 일치하면 포함
        });

        // 맵 스타일 초기화 후 검색 결과 강조 적용
        resetMapStyles();
        
        // 검색된 노선 강조
        linesToHighlight.forEach(lineId => {
            const lineElement = document.getElementById(lineId);
            if (lineElement) {
                lineElement.classList.add('highlighted-line');
            }
        });

        // 검색된 정류장 강조
        stationsToHighlight.forEach(stationId => {
            const stationEl = document.getElementById(stationId);
            if (stationEl) {
                stationEl.classList.add('highlighted-station');
            }
            // 정류장 이름 레이블도 강조
            const labelEl = stationEl.nextElementSibling; 
            if (labelEl && labelEl.classList.contains('station-name-label')) {
                labelEl.style.fontWeight = 'bold';
                // 해당 정류장이 속한 노선의 색상으로 글자색 변경 (단일 노선 기준)
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

    // 필터링된 시간표를 다시 그립니다.
    renderTimetable(filteredSchedules); 
}


// --- 8. 이벤트 리스너 설정 (페이지 로드 시 및 검색 동작) ---
document.addEventListener('DOMContentLoaded', () => {
    // 페이지 로드 시 노선도와 전체 시간표를 그립니다.
    renderBusMap(); 
    renderTimetable(); 

    const searchBox = document.getElementById('searchBox');
    const searchBtn = document.getElementById('searchBtn');

    // 검색 버튼 클릭 시 검색 함수 호출
    searchBtn.addEventListener('click', () => {
        filterTimetable(searchBox.value);
    });

    // 검색창에서 Enter 키를 눌렀을 때 검색 함수 호출
    searchBox.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            filterTimetable(searchBox.value);
        }
    });

    // 검색창 내용이 지워졌을 때 자동으로 필터링 초기화
    searchBox.addEventListener('input', () => {
        if (searchBox.value.trim() === '') {
            filterTimetable(''); // 검색어 없으면 전체 보여주기
        }
    });
});