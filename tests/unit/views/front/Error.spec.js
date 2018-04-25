import { expect } from 'chai'
import { shallow } from '@vue/test-utils'
import Error from '%/Front/Error'

describe('Front - Error', () => {
  it('renders prop code correctly', () => {
    const code = '403'
    const wrapper = shallow(Error, {
      propsData: { code }
    })
    expect(wrapper.text()).to.include(code)
  })
})
