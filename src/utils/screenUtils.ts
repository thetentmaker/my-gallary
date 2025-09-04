import { Dimensions } from 'react-native';

/**
 * 화면 크기에 따라 적절한 numColumns 값을 계산합니다.
 * 폴드폰과 일반 폰을 고려한 responsive 디자인을 제공합니다.
 */
export const calculateNumColumns = () => {
  const screenWidth = Dimensions.get('window').width;
  
  // 화면 크기별 breakpoint 정의
  const BREAKPOINTS = {
    small: 350,    // 작은 폰 (iPhone SE 등)
    medium: 500,   // 일반 폰 (iPhone, 대부분의 Android)
    large: 700,    // 태블릿 또는 폴드폰 펼쳤을 때
    xlarge: 900,   // 큰 태블릿
  };

  // 각 화면 크기별 최적의 컬럼 수
  if (screenWidth < BREAKPOINTS.small) {
    return 2; // 매우 작은 화면
  } else if (screenWidth < BREAKPOINTS.medium) {
    return 3; // 일반적인 폰
  } else if (screenWidth < BREAKPOINTS.large) {
    return 4; // 큰 폰 또는 작은 태블릿
  } else if (screenWidth < BREAKPOINTS.xlarge) {
    return 5; // 폴드폰 펼쳤을 때 또는 중간 태블릿
  } else {
    return 6; // 매우 큰 화면 (큰 태블릿)
  }
};

/**
 * numColumns에 따른 이미지 너비를 계산합니다.
 * padding과 margin을 고려합니다.
 */
export const calculateImageWidth = (numColumns: number) => {
  const screenWidth = Dimensions.get('window').width;
  return screenWidth / numColumns;
};
