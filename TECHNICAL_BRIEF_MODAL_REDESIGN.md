# Technical Brief: BookingModal Redesign
## Modern React Patterns & CSS Containment Architecture

**Status:** Ready for Implementation  
**Approved User Story:** Modal redesign with consistent rounded corners, proper state management, and CSS containment  
**Target Files:** 6 component files + 2 new files (context + hook)  
**Breaking Changes:** None (pure internal refactoring)  

---

## 1. Architecture Overview

### Current State (Anti-Patterns Identified)
- **Props Drilling:** 23+ props passed through BookingModal (single responsibility violation)
- **DOM Manipulation:** Direct `document.body.style` writes in useEffect (React escape hatch anti-pattern)
- **State Fragmentation:** Form data spread across parent `useBooking` hook + local component state
- **CSS Conflicts:** Redundant padding (pb-32) on multiple step components masking layout issues
- **Scroll Prevention:** Imperative event listeners instead of CSS containment strategy

### New Architecture (Modern React Pattern)
```
BookingModal (Layout Container + Context Provider)
├── BookingContext (Global Modal State Machine)
│   ├── state: BookingState
│   ├── formData: {name, email, phone, dogName}
│   ├── step navigation methods
│   └── form update methods
├── ModalContent (Router for visible step)
│   ├── ServiceSelect
│   ├── DogSizeSelect
│   ├── CoatTypeSelect
│   └── DateTimeSelect (refactored)
├── DateTimeSelect subtree (if modal on datetime step)
│   ├── Calendar
│   └── TimeSlots
└── BookingSuccess (Success screen)
```

**Key Principle:** Context removes prop drilling. Each component reads only what it needs from Context. No props cascade.

---

## 2. File Structure Changes

### New Files (Create These First)

**File: `src/contexts/BookingContext.tsx`**
```typescript
Purpose: Central state machine and form data management for entire booking flow
Exports:
  - BookingContext (React.createContext)
  - BookingProvider (wrapper component)
  - useBookingContext (custom hook)

Properties:
  - state: BookingState (service, dogSize, coatType, date, time)
  - formData: FormData {name, email, phoneNumber, dogName}
  - isOpen: boolean
  - isSuccess: boolean
  - currentStep: 'service' | 'size' | 'coat' | 'datetime' | 'success'
  - errors: {email?: string, phone?: string}
  
Methods:
  - openModal()
  - closeModal()
  - selectService(service: 'bath' | 'cut')
  - selectDogSize(size: DogSize)
  - selectCoatType(coat: CoatType)
  - selectDate(date: Date)
  - selectTime(time: string)
  - updateFormData(field: keyof FormData, value: string)
  - goBack()
  - resetBooking()
  - submitBooking()
  - setErrors(errors: {email?: string, phone?: string})
```

**File: `src/hooks/useBookingSteps.ts`**
```typescript
Purpose: Step machine logic (isolated, testable)
Exports:
  - useBookingSteps(state: BookingState): {currentStep, canGoBack, nextStep, prevStep, reset}
  
Logic:
  - Determine currentStep from state using same logic as existing BookingModal.getCurrentStep()
  - Encapsulate step flow rules (e.g., coat only required for cut + non-cat)
  - No side effects; pure business logic
```

### Modified Files (Refactor These)

**File: `src/components/booking/BookingModal.tsx`**
Changes:
  1. Remove props interface (23 props) → Use BookingContext instead
  2. Remove DOM manipulation useEffect → Replace with CSS containment
  3. Rename internal function to BookingModalInner (router component)
  4. Create wrapper that provides BookingContext
  5. Keep layout (backdrop + modal container + close button)
  6. Change step rendering to use useBookingContext() instead of prop drilling

Resulting signature:
```typescript
export function BookingModal({
  isOpen: boolean
  onClose: () => void
}) {
  // Setup context, handle scroll prevention via CSS only
  // Render children with context provider
}

function BookingModalInner() {
  // Use context for all state/callbacks
  // Render step based on currentStep from context
}
```

**File: `src/components/booking/ServiceSelect.tsx`**
Changes:
  1. Remove `onSelectService` prop
  2. Add `const {selectService} = useBookingContext()`
  3. Call `selectService('bath')` directly on button click
  
Result: Single-line change per button click.

**File: `src/components/booking/DogSizeSelect.tsx`**
Changes:
  1. Remove 5 props (serviceType, onSelectSize, onBack)
  2. Add `const {state, selectDogSize, goBack} = useBookingContext()`
  3. Use context values in render

**File: `src/components/booking/CoatTypeSelect.tsx`**
Changes:
  1. Remove 3 props (dogSize, onSelectCoat, onBack)
  2. Add context hook
  3. Use context values

**File: `src/components/booking/DateTimeSelect.tsx`**
Changes (Major):
  1. Remove 14 props
  2. Add context hook
  3. Move form validation from local state → Context
  4. Remove manually expanded bookedSlots tracking → can stay local (internal optimization)
  5. Layout: Keep flex/grid structure, remove pb-32 padding (see CSS section)
  6. Validation errors live in Context.errors, not local state
  7. Form field onChange: Call `updateFormData('name', value)` instead of `onChangeName`

**File: `src/components/booking/BookingSuccess.tsx`**
Changes:
  1. Remove date/time props
  2. Add context hook to read `state.date` and `state.time`

### Consuming Code (Update These)

**File: `src/app/HomeClient.tsx`** (or any page using BookingModal)
Changes:
```typescript
// BEFORE:
<BookingModal
  isOpen={booking.isOpen}
  onClose={booking.closeModal}
  state={booking.state}
  isSuccess={booking.isSuccess}
  onSelectService={booking.selectService}
  // ... 19 more props
/>

// AFTER:
<BookingModal
  isOpen={booking.isOpen}
  onClose={booking.closeModal}
/>
```

`useBooking` hook stays in parent (responsible for modal open/close lifecycle only). All step logic moves to BookingContext.

---

## 3. State Management Architecture

### BookingContext Structure
```typescript
interface FormData {
  name: string
  phoneNumber: string
  email: string
  dogName: string
}

interface BookingContextValue {
  // Read-only state
  state: BookingState
  formData: FormData
  isOpen: boolean
  isSuccess: boolean
  currentStep: StepType
  errors: {email?: string, phone?: string}
  
  // Navigation & selection
  selectService: (service: 'bath' | 'cut') => void
  selectDogSize: (size: DogSize) => void
  selectCoatType: (coat: CoatType) => void
  selectDate: (date: Date) => void
  selectTime: (time: string) => void
  goBack: () => void
  resetBooking: () => void
  
  // Form updates
  updateFormData: (field: keyof FormData, value: string) => void
  setErrors: (errors: {email?: string, phone?: string}) => void
  
  // Submit (no change to business logic)
  submitBooking: () => Promise<void>
}
```

### Data Flow Diagram
```
BookingModal (isOpen, onClose from parent)
  ↓
BookingProvider (wraps children with Context)
  ↓
useBookingSteps (pure logic)
  ↓
BookingModalInner
  ├→ ServiceSelect → selectService() → state.service updated
  ├→ DogSizeSelect → selectDogSize() → state.dogSize updated
  ├→ CoatTypeSelect → selectCoatType() → state.coatType updated
  └→ DateTimeSelect
      ├→ Calendar → selectDate() → state.date updated
      ├→ TimeSlots → selectTime() → state.time updated
      └→ Form
          └→ updateFormData() → formData updated
          
All state reads: component calls useBookingContext(), picks what it needs.
No prop cascading.
```

### Validation & Error Handling
```
DateTimeSelect.handleSubmit():
  1. Validate email & phone locally
  2. If errors: setErrors(newErrors) → Context updates
  3. Re-render: display errors from Context.errors
  4. On fix: updateFormData → setErrors cleared
  5. If valid: submitBooking() (existing logic unchanged)
```

---

## 4. CSS Strategy

### Scroll Prevention (No DOM Manipulation)

**Current Anti-Pattern:**
```typescript
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '${scrollbarWidth}px'
    document.addEventListener('wheel', preventBodyScroll, {passive: false})
    // ... cleanup
  }
}, [isOpen])
```

**New CSS-Only Approach:**

In global CSS or CSS module for BookingModal:
```css
/* When modal is open, prevent body scroll using CSS containment */
.modal-open {
  overflow: hidden; /* CSS handles it, no DOM writes */
}
```

In BookingModal component:
```typescript
useEffect(() => {
  if (isOpen) {
    document.documentElement.classList.add('modal-open')
    return () => {
      document.documentElement.classList.remove('modal-open')
    }
  }
}, [isOpen])
```

**Why Better:**
- Single CSS class toggle (non-invasive)
- No direct style manipulation (better with SSR, Next.js hydration)
- Scrollbar shift handling via CSS custom property if needed
- Cleaner separation: React manages class, CSS handles layout

### Modal Container Layout

**Target:** Fixed height, scrollable content, rounded corners preserved at bottom.

```css
.modal-container {
  display: flex;
  flex-direction: column;
  max-height: 85vh; /* Mobile */
  
  @media (min-width: 768px) {
    max-height: 90vh; /* Desktop */
  }
  
  border-radius: 1rem; /* 2xl on mobile */
  @media (min-width: 768px) {
    border-radius: 2rem; /* 4xl on desktop */
  }
  
  overflow: hidden; /* CRITICAL: clips content to rounded corners */
  position: relative;
  z-index: 60;
}
```

**Key**: `overflow: hidden` on container clips all children to the border-radius.

### Step Component Layout (Remove Padding Bandaids)

**Current (Anti-Pattern):**
```typescript
// In ServiceSelect, DogSizeSelect, etc.:
<div className='flex flex-col flex-1 p-8 md:p-14 pb-32'>
  {/* pb-32 is a bandaid for scroll clipping */}
```

**New Strategy:**
```typescript
// In all step components:
<div className='flex flex-col flex-1 p-8 md:p-14'>
  {/* Padding for comfortable UI, no bottom-padding bandaid */}
```

The modal container's `overflow: hidden` + `max-height` + `flex` layout handles scroll naturally:
- Step content grows with flex-1
- If content > max-height, scrollbar appears (browser handles)
- Scrollbar stays within modal (CSS containment)
- Rounded corners unaffected

### DateTimeSelect Layout (Specific Fix)

**Current:**
```typescript
<div className='flex flex-col md:flex-row flex-1'>
  {/* Left Panel - Calendar */}
  <div className='w-full md:w-1/2 p-4 md:p-8 pt-12 md:pt-8 pb-32 border-b md:border-b-0 md:border-r'>
    {/* Content */}
  </div>
  {/* Right Panel - Form */}
  <div className='w-full md:w-1/2 p-4 md:p-8 pt-12 md:pt-8 pb-32'>
    {/* Content */}
  </div>
</div>
```

**New:**
```typescript
<div className='flex flex-col md:flex-row flex-1 min-h-0'>
  {/* Left Panel */}
  <div className='w-full md:w-1/2 p-4 md:p-8 pt-12 md:pt-8 overflow-y-auto border-b md:border-b-0 md:border-r border-primary/5'>
    {/* Calendar + TimeSlots (scroll if needed) */}
  </div>
  {/* Right Panel */}
  <div className='w-full md:w-1/2 p-4 md:p-8 pt-12 md:pt-8 overflow-y-auto'>
    {/* Form (scroll if needed) */}
  </div>
</div>
```

**Improvements:**
1. `min-h-0` on flex container allows children to shrink below content size (critical for flex scroll containment)
2. Remove `pb-32` — natural padding in layout
3. Each panel gets `overflow-y-auto` for independent scrolling
4. Calendar + TimeSlots scroll together (left side)
5. Form scrolls independently (right side)

### Tailwind Classes (Reference)

Use these in updated components:
```
Layout:
  flex, flex-col, flex-row, flex-1, min-h-0
  md:flex-row (for DateTimeSelect two-column)
  gap-* (use instead of margin for consistent spacing)

Overflow:
  overflow-hidden (container)
  overflow-y-auto (scrollable panels)

Rounding:
  rounded-2xl (mobile), md:rounded-4xl (desktop)
  
Padding:
  p-4, md:p-8 (comfortable horizontal/vertical)
  pt-12, md:pt-8 (top padding for back button + heading space)
  NO pb-* (remove all bottom-padding bandaids)
```

---

## 5. Implementation Sequence

### Phase 1: Create New Files (No Breakage)
1. Create `src/contexts/BookingContext.tsx` with BookingProvider
2. Create `src/hooks/useBookingSteps.ts` with step logic
3. Verify types compile

**Risk:** Zero — new files don't change existing code.

### Phase 2: Refactor BookingModal.tsx (Inject Context)
1. Wrap BookingModal's internal render in BookingProvider
2. Create BookingModalInner component that uses context
3. Replace all step render logic to use context state
4. Remove DOM manipulation useEffect → Add CSS class toggle
5. Update close button to use context

**Risk:** Low — still accepts same props from parent, just internal refactoring.

### Phase 3: Update Step Components (Replace Props)
1. ServiceSelect: Remove props, use useBookingContext
2. DogSizeSelect: Remove props, use useBookingContext
3. CoatTypeSelect: Remove props, use useBookingContext
4. BookingSuccess: Remove props, use useBookingContext

**Risk:** Low — each is independent. Verify each step renders correctly.

### Phase 4: Major Refactor - DateTimeSelect
1. Replace 14 props with `useBookingContext()`
2. Move validation state to Context
3. Update form onChange handlers to use context
4. Restructure layout: remove pb-32, add flex logic

**Risk:** Medium — most complex component. Test thoroughly:
   - Scroll on mobile (both axes if present)
   - Scroll on desktop (left vs right panel)
   - Form validation (email, phone errors persist in Context)
   - Calendar + TimeSlots interaction

### Phase 5: Update Consuming Code
1. Update HomeClient.tsx to pass only `isOpen` + `onClose`
2. Remove all 21 props passed to BookingModal
3. Verify no console errors

**Risk:** Medium — need to verify all pages using BookingModal (check grep results).

### Phase 6: CSS Refinements
1. Add `modal-open` class toggle to global styles
2. Test scrollbar shift on browsers (Chrome, Safari, Firefox)
3. Verify rounded corners persist on scroll
4. Test responsive breakpoints

**Risk:** Low — CSS-only changes, easy to revert.

---

## 6. What Stays the Same (No Breaking Changes)

### Unchanged Business Logic
- Booking state machine (service → size → coat? → datetime)
- Coat type requirement logic (cut + non-cat only)
- Date/time slot availability logic
- Timezone handling
- Calendar navigation
- Slot duration calculations
- API integration (`/api/reservations` endpoint)
- Form validation rules (email regex, Chilean phone format)
- Submission flow

### Unchanged Types
- `BookingState` interface (unchanged)
- `DogSize`, `CoatType`, `ServiceType` enums
- `SLOT_DURATIONS`, `DOG_SIZE_LABELS` constants
- `BookingContextValue` (new interface, but doesn't break existing)

### Unchanged Component API (From Parent's View)
```typescript
// Parent still calls:
<BookingModal isOpen={true} onClose={handleClose} />

// Parent's useBooking hook still manages:
- isOpen state
- closeModal callback
- Modal open/close lifecycle

// Change: Context replaces internal prop drilling
```

---

## 7. Migration Path

### Step 1: Install Context & Hook
- Developers create BookingContext.tsx + useBookingSteps.ts
- Run `npm run typecheck` — should pass (no breakage yet)

### Step 2: Parallel Refactoring
- Refactor BookingModal.tsx (inject Context)
- Refactor step components (remove props)
- Both can be tested independently

### Step 3: Update Consuming Code
- Update HomeClient.tsx (and other pages)
- Change: 23 props → 2 props
- Verify modal still opens/closes

### Step 4: Test Full Flow
- Open modal
- Step through each screen
- Fill form
- Submit booking
- Verify success screen
- Close modal

### Step 5: Regression Testing
- Mobile viewport (check scroll)
- Desktop viewport (check scroll)
- Long form (simulate validation errors)
- Timezone scenarios

### Rollback Plan
- If Context causes issues: remove BookingProvider, restore prop drilling in one commit
- If CSS scroll doesn't work: revert overflow classes, keep document.body approach
- No database migrations needed (state-only change)

---

## 8. Success Criteria (Verification Checklist)

### Architectural Improvements
- [ ] Props on BookingModal reduced from 23 to 2 (isOpen, onClose)
- [ ] Props on DateTimeSelect reduced from 14 to 0 (all via context)
- [ ] All state mutations go through Context methods (no prop callbacks)
- [ ] No `document.body.style` writes (CSS class toggle only)
- [ ] Each component has exactly one `useBookingContext()` call
- [ ] No prop drilling through intermediate components

### Functional Correctness
- [ ] Booking flow works (service → size → datetime)
- [ ] Form data persists between steps (state in Context)
- [ ] "Back" button resets correct state (e.g., size → date cleared)
- [ ] Coat type only appears for cut + non-cat (step logic correct)
- [ ] Form validation errors display & clear (Context.errors used)
- [ ] Success screen shows correct date/time (read from Context.state)

### CSS & Layout
- [ ] Modal has consistent rounded corners (no clipping)
- [ ] Scroll works on mobile (single-column steps)
- [ ] Scroll works on desktop DateTimeSelect (two-panel scroll)
- [ ] No pb-32 padding bandaids in step components
- [ ] Scrollbar shift doesn't break layout
- [ ] Modal stays centered on all viewports

### Browser Compatibility
- [ ] Chrome latest
- [ ] Safari latest
- [ ] Firefox latest
- [ ] Mobile Safari (iOS)
- [ ] Chrome mobile (Android)

### No Regressions
- [ ] API calls succeed (same endpoint, same payload)
- [ ] Email/phone validation works (same rules)
- [ ] Calendar navigation works (same logic)
- [ ] Time slot availability correct (same calculations)
- [ ] Existing pages still load BookingModal (no import errors)

---

## 9. Key Implementation Details

### BookingContext.tsx (Skeleton)
```typescript
import React, { createContext, useState, useCallback } from 'react'
import type { BookingState, DogSize, CoatType } from '@/types'

export interface FormData {
  name: string
  phoneNumber: string
  email: string
  dogName: string
}

export interface BookingContextValue {
  // State
  state: BookingState
  formData: FormData
  isOpen: boolean
  isSuccess: boolean
  currentStep: string
  errors: {email?: string, phone?: string}
  
  // Methods (implementation details below)
  selectService: (service: 'bath' | 'cut') => void
  selectDogSize: (size: DogSize) => void
  selectCoatType: (coat: CoatType) => void
  selectDate: (date: Date) => void
  selectTime: (time: string) => void
  updateFormData: (field: keyof FormData, value: string) => void
  goBack: () => void
  resetBooking: () => void
  submitBooking: () => Promise<void>
  setErrors: (errors: {email?: string, phone?: string}) => void
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined)

export function BookingProvider({children}: {children: React.ReactNode}) {
  // State declarations & callbacks here
  // Return <BookingContext.Provider value={{...}}>{children}</BookingContext.Provider>
}

export function useBookingContext() {
  const context = React.useContext(BookingContext)
  if (!context) throw new Error('useBookingContext must be used inside BookingProvider')
  return context
}
```

### useBookingSteps.ts (Skeleton)
```typescript
import { BookingState, DogSize } from '@/types'

export function useBookingSteps(state: BookingState) {
  const getCurrentStep = (): string => {
    if (state.service === null) return 'service'
    if (state.dogSize === null) return 'size'
    if (state.service === 'cut' && state.dogSize !== 'cat' && state.coatType === null) return 'coat'
    return 'datetime'
  }
  
  return {
    currentStep: getCurrentStep(),
    // Add canGoBack, nextStep, etc. as needed
  }
}
```

### BookingModal.tsx (Updated Structure)
```typescript
export function BookingModal({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) {
  // Handle scroll prevention via CSS class
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('modal-open')
      return () => document.documentElement.classList.remove('modal-open')
    }
  }, [isOpen])
  
  if (!isOpen) return null
  
  return (
    <BookingProvider>
      <BookingModalInner onClose={onClose} />
    </BookingProvider>
  )
}

function BookingModalInner({onClose}: {onClose: () => void}) {
  const {currentStep, isSuccess} = useBookingContext()
  
  return (
    <div className='fixed inset-0 z-60'>
      {/* Backdrop */}
      {/* Modal Container */}
      {/* Close Button */}
      {/* Step render logic (if/else on currentStep) */}
    </div>
  )
}
```

---

## 10. Testing Strategy

### Unit Tests (Per Component)
- `BookingContext.test.tsx`: Verify state transitions, no state leaks
- `useBookingSteps.test.ts`: Verify step machine logic (service → size → datetime)
- Each step component: Verify context hook works, buttons call correct methods

### Integration Tests
- Full booking flow: open → select service → select size → select date/time → submit → success
- Back button scenarios: from each step, verify state resets correctly
- Form validation: email/phone errors display, clear on fix

### E2E Tests
- Mobile: Step through booking on iPhone viewport
- Desktop: Step through booking on 1920px viewport
- Scroll: Verify scroll works and content visible
- Roundness: Visual check that corners are rounded

### Regression Tests
- Existing booking flow still works
- Modal opens/closes from multiple entry points
- Calendar shows correct availability
- Slot selection works
- Form submission succeeds

---

## 11. Performance Considerations

### Context Re-renders
**Problem:** Every Context update triggers all consumers to re-render.
**Solution:** 
1. Split Context into separate contexts if needed (rare for booking flow)
2. Use `useMemo` on Context value to prevent new object every render
3. Each component reads only fields it uses (e.g., DateTimeSelect doesn't read `state.service` if not needed)

**Current Scale:** Not a problem. Booking modal has ~5 components consuming Context. Re-renders on each step are acceptable.

### CSS Scroll Performance
**No regressions:** CSS containment (overflow-y-auto) is performant. No JavaScript scroll listeners needed.

### Bundle Size
**Negligible increase:** 
- BookingContext.tsx: ~2KB
- useBookingSteps.ts: ~500B
- Offset by removing prop drilling (~1KB less BookingModal)
- Net: ~1.5KB increase (acceptable)

---

## 12. References to Existing Code

### Files Being Modified
- `/Users/enriqueibarra/washdog-website/src/components/booking/BookingModal.tsx` (lines 1-186)
- `/Users/enriqueibarra/washdog-website/src/components/booking/DateTimeSelect.tsx` (lines 1-262, major changes)
- `/Users/enriqueibarra/washdog-website/src/components/booking/ServiceSelect.tsx`
- `/Users/enriqueibarra/washdog-website/src/components/booking/DogSizeSelect.tsx`
- `/Users/enriqueibarra/washdog-website/src/components/booking/CoatTypeSelect.tsx`
- `/Users/enriqueibarra/washdog-website/src/components/booking/BookingSuccess.tsx`
- `/Users/enriqueibarra/washdog-website/src/app/HomeClient.tsx` (consuming code)

### Files to Create
- `/Users/enriqueibarra/washdog-website/src/contexts/BookingContext.tsx` (new)
- `/Users/enriqueibarra/washdog-website/src/hooks/useBookingSteps.ts` (new)

### Constants & Types (Unchanged)
- `/Users/enriqueibarra/washdog-website/src/types/index.ts` (BookingState, no changes needed)
- `/Users/enriqueibarra/washdog-website/src/hooks/useBooking.ts` (parent hook stays, manages modal open/close)

---

## 13. Known Constraints & Decisions

### Why Context Instead of Redux/Zustand?
- Booking modal is isolated feature (no other features read booking state)
- Only 6 components consume it
- No async state machine complexity
- Context is built-in, no external deps
- Reduces bundle size vs Redux/Zustand

### Why CSS Class Toggle Instead of Direct Style?
- SSR-friendly (hydration issues with direct style writes)
- Plays well with Next.js hydration
- Easier to track in Chrome DevTools (see class change, not style spraying)
- Cleaner separation of concerns (React manages state → CSS, CSS handles layout)

### Why Remove pb-32 Padding?
- Current padding is a symptom of broken layout (overflow not working)
- With proper overflow containment, natural padding works
- Reduces cognitive load (one padding value, not two)
- Responsive design is cleaner (no mobile-specific overrides)

### Why Two-Panel Scroll on Desktop DateTimeSelect?
- Calendar on left: calendar + time slots naturally scroll together (related info)
- Form on right: independent scroll (different content type)
- Better UX: user can see calendar while filling form on wide screens
- Prevents "form at bottom while calendar at top" scenario

---

## 14. Risk Mitigation

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Context causes re-render storms | Medium | Test with React DevTools Profiler; use useMemo if needed |
| Scroll doesn't work on mobile | Medium | Test early in Phase 4; fallback to overflow: auto if needed |
| Form validation state lost | Low | Validation happens in Context; test each error scenario |
| Existing pages break | Low | Only 2 props changed (isOpen, onClose); should not break imports |
| DateTimeSelect layout breaks | Medium | Use min-h-0 + overflow-y-auto pattern; test two-column layout on desktop |
| CSS class toggle doesn't prevent scroll | Low | Fallback: re-add event listeners (revert to old approach) |

---

## Conclusion

This brief provides a complete architectural redesign with **zero breaking changes to public API**, modern React patterns (Context + custom hooks), and proper CSS containment strategy. Implementation follows a 6-phase sequence with built-in verification checkpoints and clear rollback paths.

**Ready to hand to backend-builder and frontend-builder agents for implementation.**
