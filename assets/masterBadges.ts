import { BadgesCollection } from "@/types/commonTypes"

export const masterBadges: BadgesCollection = [
  {
    key: 1,
    code: 'first_lesson',
    name: 'Complete your first lesson',
    complete: false,
    completeIcon: require('@/assets/badges/book-badge-bronze.png'),
    incompleteIcon: require('@/assets/badges/book-badge-bronze-incomplete.png'),
  },
  {
    key: 2,
    code: '3_lessons',
    name: 'Complete 3 lessons',
    complete: false,
    completeIcon: require('@/assets/badges/book-badge-silver.png'),
    incompleteIcon: require('@/assets/badges/book-badge-silver-incomplete.png'),
  },
  {
    key: 3,
    code: 'all_lessons',
    name: 'Complete all lessons',
    complete: false,
    completeIcon: require('@/assets/badges/book-badge-gold.png'),
    incompleteIcon: require('@/assets/badges/book-badge-gold-incomplete.png'),
  },
  {
    key: 4,
    code: 'first_checklist',
    name: 'Complete your first checklist',
    complete: false,
    completeIcon: require('@/assets/badges/checklist-badge-bronze.png'),
    incompleteIcon: require('@/assets/badges/checklist-badge-bronze-incomplete.png'),
  },
  {
    key: 5,
    code: 'all_checklists',
    name: 'Complete all checklits',
    complete: false,
    completeIcon: require('@/assets/badges/checklist-badge-gold.png'),
    incompleteIcon: require('@/assets/badges/checklist-badge-gold-incomplete.png'),
  }
]