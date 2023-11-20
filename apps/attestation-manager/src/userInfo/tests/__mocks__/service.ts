import userInfo from '@userInfo/tests/stubs/user-info-dto.stub';

const UserInfoServiceMock = jest.fn().mockReturnValue({
  createUserInfo: jest.fn().mockReturnValue(userInfo),
  updateUserInfo: jest.fn().mockReturnValue(userInfo()),
  getUserInfo: jest.fn().mockReturnValue(userInfo()),
});

export default UserInfoServiceMock;
