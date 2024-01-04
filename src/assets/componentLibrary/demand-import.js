import Vue from 'vue'
import {
    bkButton, bkCard, bkUpload, bkAlert, bkCheckbox, bkCheckboxGroup, bkCollapse, bkCollapseItem, bkContainer, bkCol, bkRow, bkDatePicker,
    bkDialog, bkDropdownMenu, bkException, bkForm, bkFormItem, bkInput, bkInfoBox, bkLoading, bkMessage, bkTree,
    bkNavigation, bkNavigationMenu, bkNavigationMenuItem, bkNotify, bkOption, bkOptionGroup, bkPagination, bkRate,
    bkPopover, bkProcess, bkProgress, bkRadio, bkRadioGroup, bkSearchSelect, bkSelect, bkTableSettingContent,
    bkSideslider, bkSlider, bkSteps, bkSwitcher, bkTab, bkTabPanel, bkTable, bkTableColumn, bkTagInput, bkTimePicker,
    bkTimeline, bkClickoutside, bkTooltips, bkOverflowTips, bkCascade, bkIcon, bkDivider, bkPopconfirm, bkRadioButton, bkTag, bkBigTree, bkAnimateNumber,
    bkComposeFormItem, bkResizeLayout, bkBadge, bkRoundProgress, bkSpin, bkVirtualScroll, bkTransition, bkColorPicker,
    bkDiff, bkTransfer, bkDescription, bkDescriptionItem
} from '@canway/cw-magic-vue'

// components use
Vue.use(bkColorPicker)
Vue.use(bkVirtualScroll)
Vue.use(bkTransition)
Vue.use(bkBadge)
Vue.use(bkAnimateNumber)
Vue.use(bkButton)
Vue.use(bkCard)
Vue.use(bkUpload)
Vue.use(bkAlert)
Vue.use(bkCheckbox)
Vue.use(bkCheckboxGroup)
Vue.use(bkDivider)
Vue.use(bkPopconfirm)
Vue.use(bkRadioButton)
Vue.use(bkTag)
Vue.use(bkTableSettingContent)
Vue.use(bkCol)
Vue.use(bkCollapse)
Vue.use(bkCollapseItem)
Vue.use(bkContainer)
Vue.use(bkDatePicker)
Vue.use(bkDialog)
Vue.use(bkDropdownMenu)
Vue.use(bkException)
Vue.use(bkForm)
Vue.use(bkFormItem)
Vue.use(bkInput)
// Vue.use(bkMemberSelector)
Vue.use(bkNavigation)
Vue.use(bkNavigationMenu)
Vue.use(bkNavigationMenuItem)
Vue.use(bkOption)
Vue.use(bkOptionGroup)
Vue.use(bkPagination)
Vue.use(bkPopover)
Vue.use(bkProcess)
Vue.use(bkProgress)
Vue.use(bkRadio)
Vue.use(bkRadioGroup)
Vue.use(bkRoundProgress)
Vue.use(bkRow)
Vue.use(bkSearchSelect)
Vue.use(bkSelect)
Vue.use(bkSideslider)
Vue.use(bkSlider)
Vue.use(bkSteps)
Vue.use(bkSwitcher)
Vue.use(bkTab)
Vue.use(bkTabPanel)
Vue.use(bkTable)
Vue.use(bkTableColumn)
Vue.use(bkTagInput)
Vue.use(bkTimePicker)
Vue.use(bkTimeline)
Vue.use(bkBigTree)
Vue.use(bkTransfer)
Vue.use(bkTree)
// Vue.use(bkUpload)
// Vue.use(bkBigTree)
Vue.use(bkCascade)
// Vue.use(bkVirtualScroll)
Vue.use(bkIcon)
Vue.use(bkRate)
Vue.use(bkComposeFormItem)
Vue.use(bkResizeLayout)
Vue.use(bkSpin)
// directives use
Vue.use(bkClickoutside)
Vue.use(bkTooltips)
Vue.use(bkLoading)
Vue.use(bkOverflowTips)
Vue.use(bkDiff)
Vue.use(bkDescription)
Vue.use(bkDescriptionItem)

export const $error = (message, delay = 3000) => {
    if (message === 'cancelRequest') {
        return false
    }
    bkMessage({
        message,
        delay,
        theme: 'error',
        limit: 1
    })
}

export const $success = (message, delay = 3000) => {
    bkMessage({
        message,
        delay,
        theme: 'success',
        limit: 1
    })
}

export const $info = (message, delay = 3000) => {
    bkMessage({
        message,
        delay,
        theme: 'primary',
        limit: 1
    })
}

export const $warn = (message, delay = 3000) => {
    bkMessage({
        message,
        delay,
        theme: 'warning',
        limit: 1,
        hasCloseIcon: true
    })
}

// Vue prototype mount
Vue.prototype.$error = $error
Vue.prototype.$success = $success
Vue.prototype.$info = $info
Vue.prototype.$warn = $warn
Vue.prototype.$bkInfo = bkInfoBox
Vue.prototype.$bkMessage = bkMessage
Vue.prototype.$bkNotify = bkNotify
Vue.prototype.$bkLoading = bkLoading
