import { toast } from 'sonner';

export function checkUrlMessages() {
  if (typeof window === 'undefined') return;
  
  const urlParams = new URLSearchParams(window.location.search);
  const success = urlParams.get('success');
  const error = urlParams.get('error');

  if (success) {
    let message = 'Action completed successfully!';
    if (success === 'true') message = 'Import successful!';
    if (success === 'voted') message = 'Your vote has been cast!';
    if (success === 'deleted') message = 'Section successfully deleted!';
    if (success === 'candidate_added') message = 'Candidate added to slate!';
    if (success === 'candidate_deleted') message = 'Candidate removed from slate!';
    
    toast.success(message, {
      description: 'The changes have been saved to the database.',
    });
    
    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  if (error) {
    let message = 'An error occurred.';
    if (error === 'already_voted') message = 'You have already voted!';
    if (error === 'insert_failed') message = 'Failed to add candidate.';
    if (error === 'delete_failed') message = 'Failed to remove candidate.';
    
    toast.error(message, {
      description: 'Please contact an administrator if this is a mistake.',
    });
    
    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

export function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
  if (type === 'success') toast.success(message);
  else if (type === 'error') toast.error(message);
  else toast(message);
}
